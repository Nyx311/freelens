/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { DrawerItem } from "../../../../drawer";

import type { VolumeVariantComponent } from "../variant-helpers";

export const FiberChannel: VolumeVariantComponent<"fc"> = ({
  variant: { targetWWNs, lun, fsType = "ext4", readOnly = false },
}) => (
  <>
    <DrawerItem name={t("Target World Wide Names")}>
      <ul>
        {targetWWNs.map((targetWWN) => (
          <li key={targetWWN}>{targetWWN}</li>
        ))}
      </ul>
    </DrawerItem>
    <DrawerItem name={t("Logical Unit Number")}>{lun.toString()}</DrawerItem>
    <DrawerItem name={t("Filesystem Type")}>{fsType}</DrawerItem>
    <DrawerItem name={t("Readonly")}>{t(readOnly.toString())}</DrawerItem>
  </>
);
