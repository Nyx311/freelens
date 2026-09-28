/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { DrawerItem } from "../../../../drawer";

import type { VolumeVariantComponent } from "../variant-helpers";

export const PortworxVolume: VolumeVariantComponent<"portworxVolume"> = ({
  variant: { volumeID, fsType = "ext4", readOnly = false },
}) => (
  <>
    <DrawerItem name={t("Volume ID")}>{volumeID}</DrawerItem>
    <DrawerItem name={t("Filesystem Type")}>{fsType}</DrawerItem>
    <DrawerItem name={t("Readonly")}>{t(readOnly.toString())}</DrawerItem>
  </>
);
