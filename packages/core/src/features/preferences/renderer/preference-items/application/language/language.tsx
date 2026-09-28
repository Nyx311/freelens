/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { withInjectables } from "@ogre-tools/injectable-react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { SubTitle } from "../../../../../../renderer/components/layout/sub-title";
import { Select } from "../../../../../../renderer/components/select";
import userPreferencesStateInjectable from "../../../../../user-preferences/common/state.injectable";

import type { UserPreferencesState } from "../../../../../user-preferences/common/state.injectable";

interface Dependencies {
  state: UserPreferencesState;
}

const NonInjectedLanguage = observer(({ state }: Dependencies) => {
  const { t } = useTranslation();

  return (
    <section id="language">
      <SubTitle title={t("Language")} />
      <Select
        id="language-input"
        options={[
          { value: "system", label: t("Follow system") },
          { value: "en", label: "English" },
          { value: "zh-CN", label: "简体中文" },
        ]}
        value={state.language}
        onChange={(option) => (state.language = option?.value ?? "system")}
        themeName="lens"
      />
      <p>{t("Restart Freelens to apply the language change.")}</p>
    </section>
  );
});

export const Language = withInjectables<Dependencies>(NonInjectedLanguage, {
  getProps: (di) => ({
    state: di.inject(userPreferencesStateInjectable),
  }),
});
