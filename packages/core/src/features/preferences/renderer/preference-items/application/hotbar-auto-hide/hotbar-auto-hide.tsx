/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { withInjectables } from "@ogre-tools/injectable-react";
import { observer } from "mobx-react";
import { SubTitle } from "../../../../../../renderer/components/layout/sub-title";
import { Switch } from "../../../../../../renderer/components/switch";
import userPreferencesStateInjectable from "../../../../../user-preferences/common/state.injectable";

import type { UserPreferencesState } from "../../../../../user-preferences/common/state.injectable";

interface Dependencies {
  state: UserPreferencesState;
}

const NonInjectedHotbarAutoHide = observer(({ state }: Dependencies) => (
  <section id="hotbar">
    <SubTitle title={t("Auto-Hide Hotbar")} />
    <Switch
      checked={state.hotbarAutoHide}
      onChange={() => {
        state.hotbarAutoHide = !state.hotbarAutoHide;
      }}
    >
      {t("Automatically hide Hotbar")}
    </Switch>
  </section>
));

export const HotbarAutoHide = withInjectables<Dependencies>(NonInjectedHotbarAutoHide, {
  getProps: (di) => ({
    state: di.inject(userPreferencesStateInjectable),
  }),
});
