/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { DrawerItem } from "../../../../drawer";

import type { VolumeVariantComponent } from "../variant-helpers";

export const ImageVolume: VolumeVariantComponent<"image"> = ({ variant: { reference, pullPolicy } }) => (
  <>
    <DrawerItem name={t("OCI Reference")}>{reference}</DrawerItem>
    <DrawerItem name={t("Pull Policy")} hidden={!pullPolicy}>
      {pullPolicy}
    </DrawerItem>
  </>
);
