/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { withInjectables } from "@ogre-tools/injectable-react";
import { observer } from "mobx-react";
import { SubTitle } from "../../../../../../../renderer/components/layout/sub-title";
import { Switch } from "../../../../../../../renderer/components/switch";
import userPreferencesStateInjectable from "../../../../../../user-preferences/common/state.injectable";

import type { UserPreferencesState } from "../../../../../../user-preferences/common/state.injectable";

interface Dependencies {
  state: UserPreferencesState;
}

const NonInjectedHelmServerSide = observer(({ state }: Dependencies) => (
  <section>
    <SubTitle title={t("Server-side apply")} />
    <Switch checked={state.helmServerSide} onChange={() => (state.helmServerSide = !state.helmServerSide)}>
      {t("Use server-side apply for Helm chart operations")}
    </Switch>
    <div className="hint">
      {t(
        'When enabled, Helm will use server-side apply (--server-side=true) for install and upgrade operations. This is always enabled when "Force conflicts" is checked.',
      )}
    </div>
  </section>
));

export const HelmServerSide = withInjectables<Dependencies>(NonInjectedHelmServerSide, {
  getProps: (di) => ({
    state: di.inject(userPreferencesStateInjectable),
  }),
});
