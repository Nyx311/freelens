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

const NonInjectedKubectlBinaryDownload = observer(({ state }: Dependencies) => (
  <section>
    <SubTitle title={t("Kubectl binary download")} />
    <Switch
      checked={state.downloadKubectlBinaries}
      onChange={() => (state.downloadKubectlBinaries = !state.downloadKubectlBinaries)}
    >
      {t("Download kubectl binaries matching the Kubernetes cluster version")}
    </Switch>
  </section>
));

export const KubectlBinaryDownload = withInjectables<Dependencies>(NonInjectedKubectlBinaryDownload, {
  getProps: (di) => ({
    state: di.inject(userPreferencesStateInjectable),
  }),
});
