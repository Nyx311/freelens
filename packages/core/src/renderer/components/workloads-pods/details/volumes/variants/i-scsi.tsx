/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { DrawerItem } from "../../../../drawer";

import type { VolumeVariantComponent } from "../variant-helpers";

export const IScsi: VolumeVariantComponent<"iscsi"> = ({
  variant: { targetPortal, iqn, lun, fsType = "ext4", readOnly = false, chapAuthDiscovery, chapAuthSession, secretRef },
}) => (
  <>
    <DrawerItem name={t("Target Address")}>{targetPortal}</DrawerItem>
    <DrawerItem name={t("iSCSI qualified name")}>{iqn}</DrawerItem>
    <DrawerItem name={t("Logical Unit Number")}>{lun.toString()}</DrawerItem>
    <DrawerItem name={t("Filesystem Type")}>{fsType}</DrawerItem>
    <DrawerItem name={t("Readonly")}>{t(readOnly.toString())}</DrawerItem>
    {chapAuthDiscovery && (
      <DrawerItem name={t("CHAP Discovery Authentication")}>{t(chapAuthDiscovery.toString())}</DrawerItem>
    )}
    {chapAuthSession && (
      <DrawerItem name={t("CHAP Session Authentication")}>{t(chapAuthSession.toString())}</DrawerItem>
    )}
    {secretRef && <DrawerItem name={t("CHAP Secret")}>{secretRef.name}</DrawerItem>}
  </>
);
