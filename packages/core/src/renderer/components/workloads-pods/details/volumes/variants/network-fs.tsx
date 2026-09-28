/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { DrawerItem } from "../../../../drawer";

import type { VolumeVariantComponent } from "../variant-helpers";

export const NetworkFs: VolumeVariantComponent<"nfs"> = ({ variant: { server, path, readOnly = false } }) => (
  <>
    <DrawerItem name={t("Server")}>{server}</DrawerItem>
    <DrawerItem name={t("Path")}>{path}</DrawerItem>
    <DrawerItem name={t("Readonly")}>{t(readOnly.toString())}</DrawerItem>
  </>
);
