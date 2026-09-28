/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { DrawerItem } from "../../../../drawer";

import type { VolumeVariantComponent } from "../variant-helpers";

export const Quobyte: VolumeVariantComponent<"quobyte"> = ({
  variant: { registry, volume, readOnly = false, user = "serviceaccount", group, tenant },
}) => (
  <>
    <DrawerItem name={t("Registry")}>{registry}</DrawerItem>
    <DrawerItem name={t("Volume")}>{volume}</DrawerItem>
    <DrawerItem name={t("Readonly")}>{t(readOnly.toString())}</DrawerItem>
    <DrawerItem name={t("User")}>{user}</DrawerItem>
    <DrawerItem name={t("Group")}>{group ?? t("-- no group --")}</DrawerItem>
    <DrawerItem name={t("Tenant")} hidden={!tenant}>
      {tenant}
    </DrawerItem>
  </>
);
