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

const NonInjectedFlexVolume = (props: PodVolumeVariantSpecificProps<"flexVolume"> & Dependencies) => {
  const {
    pod,
    variant: { driver, fsType, secretRef, readOnly = false, options = {} },
    secretApi,
  } = props;

  return (
    <>
      <DrawerItem name={t("Driver")}>{driver}</DrawerItem>
      <DrawerItem name={t("Filesystem Type")}>{fsType || t("-- system default --")}</DrawerItem>
      <LocalRef pod={pod} title={t("Secret")} kubeRef={secretRef} api={secretApi} />
      <DrawerItem name={t("Readonly")}>{t(readOnly.toString())}</DrawerItem>
      {Object.entries(options).map(([key, value]) => (
        <DrawerItem key={key} name={`Option: ${key}`}>
          {value}
        </DrawerItem>
      ))}
    </>
  );
};

export const FlexVolume = withInjectables<Dependencies, PodVolumeVariantSpecificProps<"flexVolume">>(
  NonInjectedFlexVolume,
  {
    getProps: (di, props) => ({
      ...props,
      secretApi: di.inject(secretApiInjectable),
    }),
  },
);
