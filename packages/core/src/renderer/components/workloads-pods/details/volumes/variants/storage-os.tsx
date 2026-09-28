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

const NonInjectedStorageOs = (props: PodVolumeVariantSpecificProps<"storageos"> & Dependencies) => {
  const {
    pod,
    variant: { volumeName, volumeNamespace, fsType = "ext4", readOnly = false, secretRef },
    secretApi,
  } = props;

  return (
    <>
      <DrawerItem name={t("Volume Name")}>{volumeName}</DrawerItem>
      <DrawerItem name={t("Volume Namespace")} hidden={volumeNamespace === "default"}>
        {volumeNamespace === volumeName ? t("- no default behaviour -") : volumeNamespace || pod.getNs()}
      </DrawerItem>
      <DrawerItem name={t("Filesystem type")}>{fsType}</DrawerItem>
      <DrawerItem name={t("Readonly")}>{t(readOnly.toString())}</DrawerItem>
      <LocalRef pod={pod} title={t("Secret")} kubeRef={secretRef} api={secretApi} />
    </>
  );
};

export const StorageOs = withInjectables<Dependencies, PodVolumeVariantSpecificProps<"storageos">>(
  NonInjectedStorageOs,
  {
    getProps: (di, props) => ({
      ...props,
      secretApi: di.inject(secretApiInjectable),
    }),
  },
);
