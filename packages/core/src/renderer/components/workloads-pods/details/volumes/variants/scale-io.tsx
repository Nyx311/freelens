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

const NonInjectedScaleIo = (props: PodVolumeVariantSpecificProps<"scaleIO"> & Dependencies) => {
  const {
    pod,
    variant: {
      gateway,
      system,
      secretRef,
      sslEnabled = false,
      protectionDomain,
      storagePool,
      storageMode = "ThinProvisioned",
      volumeName,
      fsType = "xfs",
      readOnly = false,
    },
    secretApi,
  } = props;

  return (
    <>
      <DrawerItem name={t("Gateway")}>{gateway}</DrawerItem>
      <DrawerItem name={t("System")}>{system}</DrawerItem>
      <LocalRef pod={pod} title={t("Name")} kubeRef={secretRef} api={secretApi} />
      <DrawerItem name={t("SSL Enabled")}>{t(sslEnabled.toString())}</DrawerItem>
      <DrawerItem name={t("Protection Domain Name")} hidden={!protectionDomain}>
        {protectionDomain}
      </DrawerItem>
      <DrawerItem name={t("Storage Pool")} hidden={!storagePool}>
        {storagePool}
      </DrawerItem>
      <DrawerItem name={t("Storage Mode")} hidden={!storageMode}>
        {storageMode}
      </DrawerItem>
      <DrawerItem name={t("Volume Name")}>{volumeName}</DrawerItem>
      <DrawerItem name={t("Filesystem Type")}>{fsType}</DrawerItem>
      <DrawerItem name={t("Readonly")}>{t(readOnly.toString())}</DrawerItem>
    </>
  );
};

export const ScaleIo = withInjectables<Dependencies, PodVolumeVariantSpecificProps<"scaleIO">>(NonInjectedScaleIo, {
  getProps: (di, props) => ({
    ...props,
    secretApi: di.inject(secretApiInjectable),
  }),
});
