/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import i18n, { t } from "@freelensapp/i18n";
import electronAppInjectable from "../../../main/electron-app/electron-app.injectable";
import { getDiForUnitTesting } from "../../../main/getDiForUnitTesting";
import userPreferencesStateInjectable from "../../user-preferences/common/state.injectable";
import initializeLanguageInjectable from "./init.injectable";

afterEach(async () => {
  vi.restoreAllMocks();
  await i18n.changeLanguage("en");
});

it("follows the preferred system UI language rather than the regional format", async () => {
  const di = getDiForUnitTesting();
  const app = di.inject(electronAppInjectable);
  const state = di.inject(userPreferencesStateInjectable);
  const regionalFormat = new Intl.DateTimeFormat("en-US").resolvedOptions();

  state.language = "system";
  vi.spyOn(app, "getPreferredSystemLanguages").mockReturnValue(["zh-CN"]);
  vi.spyOn(Intl.DateTimeFormat.prototype, "resolvedOptions").mockReturnValue(regionalFormat);

  await di.inject(initializeLanguageInjectable).run();

  expect(t("Language")).toBe("语言");
});

it("keeps an explicit language choice when the system UI language differs", async () => {
  const di = getDiForUnitTesting();

  di.inject(userPreferencesStateInjectable).language = "en";
  vi.spyOn(di.inject(electronAppInjectable), "getPreferredSystemLanguages").mockReturnValue(["zh-CN"]);

  await di.inject(initializeLanguageInjectable).run();

  expect(t("Language")).toBe("Language");
});
