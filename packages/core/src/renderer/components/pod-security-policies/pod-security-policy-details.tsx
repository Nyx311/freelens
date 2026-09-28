/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import "./pod-security-policy-details.scss";

import { t } from "@freelensapp/i18n";
import { PodSecurityPolicy } from "@freelensapp/kube-object";
import { loggerInjectionToken } from "@freelensapp/logger";
import { withInjectables } from "@ogre-tools/injectable-react";
import { observer } from "mobx-react";
import React from "react";
import { Badge } from "../badge";
import { DrawerItem, DrawerTitle } from "../drawer";
import { Table, TableCell, TableHead, TableRow } from "../table";

import type { Logger } from "@freelensapp/logger";
import type { StrictReactNode } from "@freelensapp/utilities";

import type { KubeObjectDetailsProps } from "../kube-object-details";

export interface PodSecurityPolicyDetailsProps extends KubeObjectDetailsProps<PodSecurityPolicy> {}

interface RuleGroup {
  rule: string;
  ranges?: {
    max: number;
    min: number;
  }[];
}

interface Dependencies {
  logger: Logger;
}

@observer
class NonInjectedPodSecurityPolicyDetails extends React.Component<PodSecurityPolicyDetailsProps & Dependencies> {
  renderRuleGroup(title: StrictReactNode, group: RuleGroup | undefined) {
    if (!group) return null;
    const { rule, ranges } = group;

    return (
      <>
        <DrawerTitle>{title}</DrawerTitle>
        <DrawerItem name={t("Rule")}>{rule}</DrawerItem>
        {ranges && (
          <DrawerItem name={t("Ranges (Min-Max)")} labelsOnly>
            {ranges.map(({ min, max }, index) => (
              <Badge key={index} label={`${min} - ${max}`} />
            ))}
          </DrawerItem>
        )}
      </>
    );
  }

  render() {
    const { object: psp } = this.props;

    if (!psp) {
      return null;
    }

    if (!(psp instanceof PodSecurityPolicy)) {
      this.props.logger.error(
        "[PodSecurityPolicyDetails]: passed object that is not an instanceof PodSecurityPolicy",
        psp,
      );

      return null;
    }

    const {
      allowedHostPaths,
      allowedCapabilities,
      allowedCSIDrivers,
      allowedFlexVolumes,
      allowedProcMountTypes,
      allowedUnsafeSysctls,
      allowPrivilegeEscalation,
      defaultAddCapabilities,
      forbiddenSysctls,
      fsGroup,
      hostIPC,
      hostNetwork,
      hostPID,
      hostPorts,
      privileged,
      readOnlyRootFilesystem,
      requiredDropCapabilities,
      runAsGroup,
      runAsUser,
      runtimeClass,
      seLinux,
      supplementalGroups,
      volumes,
    } = psp.spec;

    return (
      <div className="PodSecurityPolicyDetails">
        {allowedCapabilities && (
          <DrawerItem name={t("Allowed Capabilities")}>{allowedCapabilities.join(", ")}</DrawerItem>
        )}

        {volumes && <DrawerItem name={t("Volumes")}>{volumes.join(", ")}</DrawerItem>}

        {allowedCSIDrivers && (
          <DrawerItem name={t("Allowed CSI Drivers")}>
            {allowedCSIDrivers.map(({ name }) => name).join(", ")}
          </DrawerItem>
        )}

        {allowedFlexVolumes && (
          <DrawerItem name={t("Allowed Flex Volumes")}>
            {allowedFlexVolumes.map(({ driver }) => driver).join(", ")}
          </DrawerItem>
        )}

        {allowedProcMountTypes && (
          <DrawerItem name={t("Allowed Proc Mount Types")}>{allowedProcMountTypes.join(", ")}</DrawerItem>
        )}

        {allowedUnsafeSysctls && (
          <DrawerItem name={t("Allowed Unsafe Sysctls")}>{allowedUnsafeSysctls.join(", ")}</DrawerItem>
        )}

        {forbiddenSysctls && <DrawerItem name={t("Forbidden Sysctls")}>{forbiddenSysctls.join(", ")}</DrawerItem>}

        <DrawerItem name={t("Allow Privilege Escalation")}>{allowPrivilegeEscalation ? t("Yes") : t("No")}</DrawerItem>

        <DrawerItem name={t("Privileged")}>{privileged ? t("Yes") : t("No")}</DrawerItem>

        <DrawerItem name={t("Read-only Root Filesystem")}>{readOnlyRootFilesystem ? t("Yes") : t("No")}</DrawerItem>

        {defaultAddCapabilities && (
          <DrawerItem name={t("Default Add Capabilities")}>{defaultAddCapabilities.join(", ")}</DrawerItem>
        )}

        {requiredDropCapabilities && (
          <DrawerItem name={t("Required Drop Capabilities")}>{requiredDropCapabilities.join(", ")}</DrawerItem>
        )}

        <DrawerItem name={t("Host IPC")}>{hostIPC ? t("Yes") : t("No")}</DrawerItem>

        <DrawerItem name={t("Host Network")}>{hostNetwork ? t("Yes") : t("No")}</DrawerItem>

        <DrawerItem name={t("Host PID")}>{hostPID ? t("Yes") : t("No")}</DrawerItem>

        {hostPorts && (
          <DrawerItem name={t("Host Ports (Min-Max)")} labelsOnly>
            {hostPorts.map(({ min, max }, index) => {
              return <Badge key={index} label={`${min} - ${max}`} />;
            })}
          </DrawerItem>
        )}

        {allowedHostPaths && (
          <>
            <DrawerTitle>{t("Allowed Host Paths")}</DrawerTitle>
            <Table>
              <TableHead>
                <TableCell>{t("Path Prefix")}</TableCell>
                <TableCell>{t("Read-only")}</TableCell>
              </TableHead>
              {allowedHostPaths.map(({ pathPrefix, readOnly }, index) => (
                <TableRow key={index}>
                  <TableCell>{pathPrefix}</TableCell>
                  <TableCell>{readOnly ? t("Yes") : t("No")}</TableCell>
                </TableRow>
              ))}
            </Table>
          </>
        )}

        {fsGroup && this.renderRuleGroup(t("Fs Group"), fsGroup)}
        {runAsGroup && this.renderRuleGroup(t("Run As Group"), runAsGroup)}
        {runAsUser && this.renderRuleGroup(t("Run As User"), runAsUser)}
        {supplementalGroups && this.renderRuleGroup(t("Supplemental Groups"), supplementalGroups)}

        {runtimeClass && (
          <>
            <DrawerTitle>{t("Runtime Class")}</DrawerTitle>
            <DrawerItem name={t("Allowed Runtime Class Names")}>
              {runtimeClass.allowedRuntimeClassNames?.join(", ") || "-"}
            </DrawerItem>
            <DrawerItem name={t("Default Runtime Class Name")}>
              {runtimeClass.defaultRuntimeClassName || "-"}
            </DrawerItem>
          </>
        )}

        {seLinux && (
          <>
            <DrawerTitle>{t("Se Linux")}</DrawerTitle>
            <DrawerItem name={t("Rule")}>{seLinux.rule}</DrawerItem>
            {seLinux.seLinuxOptions && (
              <>
                <DrawerItem name={t("Level")}>{seLinux.seLinuxOptions.level}</DrawerItem>
                <DrawerItem name={t("Role")}>{seLinux.seLinuxOptions.role}</DrawerItem>
                <DrawerItem name={t("Type")}>{seLinux.seLinuxOptions.type}</DrawerItem>
                <DrawerItem name={t("User")}>{seLinux.seLinuxOptions.user}</DrawerItem>
              </>
            )}
          </>
        )}
      </div>
    );
  }
}

export const PodSecurityPolicyDetails = withInjectables<Dependencies, PodSecurityPolicyDetailsProps>(
  NonInjectedPodSecurityPolicyDetails,
  {
    getProps: (di, props) => ({
      ...props,
      logger: di.inject(loggerInjectionToken),
    }),
  },
);
