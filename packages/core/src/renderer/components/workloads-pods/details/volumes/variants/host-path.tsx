/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { DrawerItem } from "../../../../drawer";

import type { VolumeVariantComponent } from "../variant-helpers";

export const HostPath: VolumeVariantComponent<"hostPath"> = ({ variant: { path, type } }) => (
  <>
    <DrawerItem name={t("Node's Host Filesystem Path")}>{path}</DrawerItem>
    <DrawerItem name={t("Check Behaviour")}>{type || t("-- none --")}</DrawerItem>
  </>
);
