/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { secretApiInjectable } from "@freelensapp/kube-api-specifics";
import { withInjectables } from "@ogre-tools/injectable-react";
import { DrawerItem } from "../../../../drawer";
import { LocalRef } from "../variant-helpers";

import type { SecretApi } from "@freelensapp/kube-api";

import type { PodVolumeVariantSpecificProps } from "../variant-helpers";

interface Dependencies {
  secretApi: SecretApi;
}

const NonInjectedCephFs = (props: PodVolumeVariantSpecificProps<"cephfs"> & Dependencies) => {
  const {
    pod,
    variant: {
      monitors,
      path = "/",
      user = "admin",
      secretFile = "/etc/ceph/user.secret",
      secretRef,
      readOnly = false,
    },
    secretApi,
  } = props;

  return (
    <>
      <DrawerItem name={t("Monitors")}>
        <ul>
          {monitors.map((monitor) => (
            <li key={monitor}>{monitor}</li>
          ))}
        </ul>
      </DrawerItem>
      <DrawerItem name={t("Mount Path")}>{path}</DrawerItem>
      <DrawerItem name={t("Username")}>{user}</DrawerItem>
      {secretRef ? (
        <LocalRef pod={pod} title={t("Secret")} kubeRef={secretRef} api={secretApi} />
      ) : (
        <DrawerItem name={t("Secret Filepath")}>{secretFile}</DrawerItem>
      )}
      <DrawerItem name={t("Readonly")} data-testid="cephfs-readonly">
        {readOnly.toString()}
      </DrawerItem>
    </>
  );
};

export const CephFs = withInjectables<Dependencies, PodVolumeVariantSpecificProps<"cephfs">>(NonInjectedCephFs, {
  getProps: (di, props) => ({
    ...props,
    secretApi: di.inject(secretApiInjectable),
  }),
});
