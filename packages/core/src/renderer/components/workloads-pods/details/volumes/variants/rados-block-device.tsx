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

const NonInjectedRadosBlockDevice = (props: PodVolumeVariantSpecificProps<"rbd"> & Dependencies) => {
  const {
    pod,
    variant: {
      monitors,
      image,
      fsType = "ext4",
      pool = "rbd",
      user = "admin",
      keyring = "/etc/ceph/keyright",
      secretRef,
      readOnly = false,
    },
    secretApi,
  } = props;

  return (
    <>
      <DrawerItem name={t("Ceph Monitors")}>
        <ul>
          {monitors.map((monitor) => (
            <li key={monitor}>{monitor}</li>
          ))}
        </ul>
      </DrawerItem>
      <DrawerItem name={t("Image")}>{image}</DrawerItem>
      <DrawerItem name={t("Filesystem Type")}>{fsType}</DrawerItem>
      <DrawerItem name={t("Pool")}>{pool}</DrawerItem>
      <DrawerItem name={t("User")}>{user}</DrawerItem>
      {secretRef ? (
        <LocalRef pod={pod} title={t("Authentication Secret")} kubeRef={secretRef} api={secretApi} />
      ) : (
        <DrawerItem name={t("Keyright Path")}>{keyring}</DrawerItem>
      )}
      <DrawerItem name={t("Readonly")}>{t(readOnly.toString())}</DrawerItem>
    </>
  );
};

export const RadosBlockDevice = withInjectables<Dependencies, PodVolumeVariantSpecificProps<"rbd">>(
  NonInjectedRadosBlockDevice,
  {
    getProps: (di, props) => ({
      ...props,
      secretApi: di.inject(secretApiInjectable),
    }),
  },
);
