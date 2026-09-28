/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { getInjectable } from "@ogre-tools/injectable";
import { preferenceItemInjectionToken } from "../preference-item-injection-token";

const applicationPreferenceTabInjectable = getInjectable({
  id: "application-preference-tab",

  instantiate: () => ({
    kind: "tab" as const,
    id: "application-tab",
    parentId: "general-tab-group" as const,
    pathId: "app",
    label: t("App"),
    orderNumber: 10,
  }),

  injectionToken: preferenceItemInjectionToken,
});

export default applicationPreferenceTabInjectable;
