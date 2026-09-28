/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { getInjectable } from "@ogre-tools/injectable";
import { preferenceItemInjectionToken } from "../../preference-item-injection-token";
import { Language } from "./language";

const languagePreferenceBlockInjectable = getInjectable({
  id: "language-preference-item",
  instantiate: () => ({
    kind: "block" as const,
    id: "language",
    parentId: "application-page",
    orderNumber: 65,
    Component: Language,
  }),
  injectionToken: preferenceItemInjectionToken,
});

export default languagePreferenceBlockInjectable;
