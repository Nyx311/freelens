/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { observer } from "mobx-react";
import React from "react";
import { DrawerItem, DrawerTitle } from "../drawer";

import type { ValidatingAdmissionPolicyBinding } from "@freelensapp/kube-object";

import type { KubeObjectDetailsProps } from "../kube-object-details";

export interface ValidatingAdmissionPolicyBindingDetailsProps
  extends KubeObjectDetailsProps<ValidatingAdmissionPolicyBinding> {}

@observer
export class ValidatingAdmissionPolicyBindingDetails extends React.Component<ValidatingAdmissionPolicyBindingDetailsProps> {
  render() {
    const { object: binding } = this.props;

    const paramRef = binding.getParamRef();
    const matchResources = binding.getMatchResources();
    const validationActions = binding.getValidationActions();

    return (
      <div className="ValidatingAdmissionPolicyBindingDetails">
        <DrawerItem name={t("API version")}>{binding.apiVersion}</DrawerItem>
        <DrawerItem name={t("Policy Name")}>{binding.getPolicyName()}</DrawerItem>
        <DrawerItem name={t("Validation Actions")}>{validationActions.join(", ")}</DrawerItem>

        {paramRef && (
          <>
            <DrawerTitle>{t("Param Ref")}</DrawerTitle>
            {paramRef.name && <DrawerItem name={t("Name")}>{paramRef.name}</DrawerItem>}
            {paramRef.namespace && <DrawerItem name={t("Namespace")}>{paramRef.namespace}</DrawerItem>}
            {paramRef.parameterNotFoundAction && (
              <DrawerItem name={t("Parameter Not Found Action")}>{paramRef.parameterNotFoundAction}</DrawerItem>
            )}
          </>
        )}

        {matchResources && (
          <>
            <DrawerTitle>{t("Match Resources")}</DrawerTitle>
            {matchResources.matchPolicy && (
              <DrawerItem name={t("Match Policy")}>{matchResources.matchPolicy}</DrawerItem>
            )}
            <DrawerItem name={t("Resource Rules")}>
              {matchResources.resourceRules?.map((rule, index) => (
                <div key={index}>
                  <div>API Groups: {rule.apiGroups.join(", ")}</div>
                  <div>API Versions: {rule.apiVersions?.join(", ")}</div>
                  <div>Operations: {rule.operations.join(", ")}</div>
                  {rule.resources && <div>Resources: {rule.resources.join(", ")}</div>}
                  {rule.resourceNames && <div>Resource Names: {rule.resourceNames.join(", ")}</div>}
                  {rule.scope && <div>Scope: {rule.scope}</div>}
                </div>
              ))}
            </DrawerItem>
          </>
        )}
      </div>
    );
  }
}
