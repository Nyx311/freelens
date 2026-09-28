/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { displayMode } from "@freelensapp/utilities";
import React from "react";
import { DrawerItem, DrawerTitle } from "../../../../drawer";

import type { VolumeVariantComponent } from "../variant-helpers";

export const Projected: VolumeVariantComponent<"projected"> = ({ variant: { sources, defaultMode } }) => (
  <>
    {typeof defaultMode === "number" && (
      <DrawerItem name={t("Default Mount Mode")}>{displayMode(defaultMode)}</DrawerItem>
    )}
    <DrawerItem name={t("Sources")}>
      {sources?.map(({ secret, downwardAPI, configMap, serviceAccountToken }, index) => (
        <React.Fragment key={index}>
          {secret && (
            <>
              <DrawerTitle size="sub-title">{t("Secret")}</DrawerTitle>
              <DrawerItem name={t("Name")}>{secret.name}</DrawerItem>
              <DrawerItem name={t("Items")}>
                <ul>
                  {secret.items?.map(({ key, path, mode }) => (
                    <li key={key}>
                      {`${key}⇢${path}`}
                      {typeof mode === "number" && ` (${displayMode(mode)})`}
                    </li>
                  ))}
                </ul>
              </DrawerItem>
            </>
          )}
          {downwardAPI && (
            <>
              <DrawerTitle size="sub-title">{t("Downward API")}</DrawerTitle>
              <DrawerItem name={t("Items")}>
                <ul>
                  {downwardAPI.items?.map(({ path }) => (
                    <li key={path}>{path}</li>
                  ))}
                </ul>
              </DrawerItem>
            </>
          )}
          {configMap && (
            <>
              <DrawerTitle size="sub-title">{t("Config Map")}</DrawerTitle>
              <DrawerItem name={t("Name")}>{configMap.name}</DrawerItem>
              <DrawerItem name={t("Items")}>
                <ul>
                  {configMap.items?.map(({ key, path }) => (
                    <li key={key}>{`${key}⇢${path}`}</li>
                  ))}
                </ul>
              </DrawerItem>
            </>
          )}
          {serviceAccountToken && (
            <>
              <DrawerTitle size="sub-title">{t("Service Account Token")}</DrawerTitle>
              <DrawerItem name={t("Audience")} hidden={!serviceAccountToken.audience}>
                {serviceAccountToken.audience}
              </DrawerItem>
              <DrawerItem name={t("Expiration")}>
                {`${serviceAccountToken.expirationSeconds ?? 60 * 60 /* an hour */}s`}
              </DrawerItem>
              <DrawerItem name={t("Path")}>{serviceAccountToken.path}</DrawerItem>
            </>
          )}
        </React.Fragment>
      ))}
    </DrawerItem>
  </>
);
