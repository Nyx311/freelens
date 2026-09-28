/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { getInjectable } from "@ogre-tools/injectable";
import { PreferencePageComponent } from "../../preference-page-component";
import { preferenceItemInjectionToken } from "../preference-item-injection-token";

import type { PreferenceItemComponent, PreferencePage } from "../preference-item-injection-token";

const TerminalPage: PreferenceItemComponent<PreferencePage> = ({ children, item }) => (
  <PreferencePageComponent title={t("Terminal")} id={item.id}>
    {children}
  </PreferencePageComponent>
);

const terminalPagePreferenceItemInjectable = getInjectable({
  id: "terminal-preference-page",

  instantiate: () => ({
    kind: "page" as const,
    id: "terminal-page",
    parentId: "terminal-tab",
    Component: TerminalPage,
  }),

  injectionToken: preferenceItemInjectionToken,
});

export default terminalPagePreferenceItemInjectable;
