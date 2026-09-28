/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import i18n from "@freelensapp/i18n";
import { getInjectable } from "@ogre-tools/injectable";
import { initReactI18next } from "react-i18next";
import { beforeFrameStartsSecondInjectionToken } from "../../../renderer/before-frame-starts/tokens";
import userPreferencesStateInjectable from "../../user-preferences/common/state.injectable";
import loadUserPreferencesStorageInjectable from "../../user-preferences/renderer/load-storage.injectable";

const initializeLanguageInjectable = getInjectable({
  id: "initialize-language",
  instantiate: (di) => ({
    run: async () => {
      const { language } = di.inject(userPreferencesStateInjectable);

      initReactI18next.init(i18n);
      await i18n.changeLanguage(
        sessionStorage.getItem("freelens-ui-language") ??
          (language === "system" ? (navigator.languages[0] ?? navigator.language) : language),
      );
      document.documentElement.lang = i18n.resolvedLanguage ?? "en";
    },
    runAfter: loadUserPreferencesStorageInjectable,
  }),
  injectionToken: beforeFrameStartsSecondInjectionToken,
});

export default initializeLanguageInjectable;
