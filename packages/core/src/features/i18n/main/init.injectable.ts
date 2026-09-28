/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { beforeApplicationIsLoadingInjectionToken } from "@freelensapp/application";
import i18n from "@freelensapp/i18n";
import { getInjectable } from "@ogre-tools/injectable";
import electronAppInjectable from "../../../main/electron-app/electron-app.injectable";
import userPreferencesStateInjectable from "../../user-preferences/common/state.injectable";
import loadUserPreferencesStorageInjectable from "../../user-preferences/main/load-storage.injectable";

const initializeLanguageInjectable = getInjectable({
  id: "initialize-language",
  instantiate: (di) => ({
    run: async () => {
      const { language } = di.inject(userPreferencesStateInjectable);

      await i18n.changeLanguage(
        language === "system" ? (di.inject(electronAppInjectable).getPreferredSystemLanguages()[0] ?? "en") : language,
      );
    },
    runAfter: loadUserPreferencesStorageInjectable,
  }),
  injectionToken: beforeApplicationIsLoadingInjectionToken,
});

export default initializeLanguageInjectable;
