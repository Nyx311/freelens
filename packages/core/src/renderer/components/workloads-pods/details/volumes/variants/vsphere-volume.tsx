/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { DrawerItem } from "../../../../drawer";

import type { VolumeVariantComponent } from "../variant-helpers";

export const VsphereVolume: VolumeVariantComponent<"vsphereVolume"> = ({
  variant: { volumePath, fsType = "ext4", storagePolicyName, storagePolicyID },
}) => (
  <>
    <DrawerItem name={t("Virtual Machine Disk Volume")}>{volumePath}</DrawerItem>
    <DrawerItem name={t("Filesystem type")}>{fsType}</DrawerItem>
    <DrawerItem name={t("Storage Policy Based Management Profile Name")} hidden={!storagePolicyName}>
      {storagePolicyName}
    </DrawerItem>
    <DrawerItem name={t("Storage Policy Based Management Profile ID")} hidden={!storagePolicyID}>
      {storagePolicyID}
    </DrawerItem>
  </>
);
