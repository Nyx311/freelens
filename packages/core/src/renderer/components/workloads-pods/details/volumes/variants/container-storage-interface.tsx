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

const NonInjectedContainerStorageInterface = (props: PodVolumeVariantSpecificProps<"csi"> & Dependencies) => {
  const {
    pod,
    variant: {
      driver,
      readOnly = false,
      fsType = "ext4",
      volumeAttributes = {},
      nodePublishSecretRef,
      controllerPublishSecretRef,
      nodeStageSecretRef,
      controllerExpandSecretRef,
    },
    secretApi,
  } = props;

  return (
    <>
      <DrawerItem name={t("Driver")}>{driver}</DrawerItem>
      <DrawerItem name={t("ReadOnly")}>{t(readOnly.toString())}</DrawerItem>
      <DrawerItem name={t("Filesystem Type")}>{fsType}</DrawerItem>
      <LocalRef pod={pod} title={t("Controller Publish Secret")} kubeRef={controllerPublishSecretRef} api={secretApi} />
      <LocalRef pod={pod} title={t("Controller Expand Secret")} kubeRef={controllerExpandSecretRef} api={secretApi} />
      <LocalRef pod={pod} title={t("Node Publish Secret")} kubeRef={nodePublishSecretRef} api={secretApi} />
      <LocalRef pod={pod} title={t("Node Stage Secret")} kubeRef={nodeStageSecretRef} api={secretApi} />
      {Object.entries(volumeAttributes).map(([key, value]) => (
        <DrawerItem key={key} name={key}>
          {value}
        </DrawerItem>
      ))}
    </>
  );
};

export const ContainerStorageInterface = withInjectables<Dependencies, PodVolumeVariantSpecificProps<"csi">>(
  NonInjectedContainerStorageInterface,
  {
    getProps: (di, props) => ({
      ...props,
      secretApi: di.inject(secretApiInjectable),
    }),
  },
);
