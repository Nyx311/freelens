/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { DrawerItem } from "../../../../drawer";

import type { VolumeVariantComponent } from "../variant-helpers";

export const AzureFile: VolumeVariantComponent<"azureFile"> = ({
  variant: { readOnly = false, secretName, shareName, secretNamespace = "default" },
}) => (
  <>
    <DrawerItem name={t("Secret Name")}>{secretName}</DrawerItem>
    <DrawerItem name={t("Share Name")}>{shareName}</DrawerItem>
    <DrawerItem name={t("Namespace of Secret")}>{secretNamespace}</DrawerItem>
    <DrawerItem name={t("Readonly")}>{t(readOnly.toString())}</DrawerItem>
  </>
);
