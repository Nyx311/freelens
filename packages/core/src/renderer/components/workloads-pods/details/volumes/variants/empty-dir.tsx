/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { DrawerItem } from "../../../../drawer";

import type { VolumeVariantComponent } from "../variant-helpers";

export const EmptyDir: VolumeVariantComponent<"emptyDir"> = ({ variant: { medium, sizeLimit } }) => (
  <>
    <DrawerItem name={t("Medium")}>{medium || t("<node's default medium>")}</DrawerItem>
    <DrawerItem name={t("Size Limit")} hidden={!sizeLimit}>
      {sizeLimit}
    </DrawerItem>
  </>
);
