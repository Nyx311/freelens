/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { DrawerItem } from "../../../../drawer";

import type { VolumeVariantComponent } from "../variant-helpers";

export const GlusterFs: VolumeVariantComponent<"glusterfs"> = ({ variant: { endpoints, path, readOnly = false } }) => (
  <>
    <DrawerItem name={t("Endpoints object name")}>{endpoints}</DrawerItem>
    <DrawerItem name={t("Glusterfs volume name")}>{path}</DrawerItem>
    <DrawerItem name={t("Readonly Mountpoint")}>{t(readOnly.toString())}</DrawerItem>
  </>
);
