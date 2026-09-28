/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import i18n from "@freelensapp/i18n";
import { createContainer } from "@ogre-tools/injectable";
import lensDarkThemeInjectable from "./lens-dark.injectable";
import lensLightThemeInjectable from "./lens-light.injectable";
import lensThemesInjectable from "./themes.injectable";

afterEach(async () => {
  await i18n.changeLanguage("en");
});

it.each(["Light", "Dark"])("keeps the saved %s theme selectable in Chinese", async (themeName) => {
  await i18n.changeLanguage("zh-CN");

  const di = createContainer("theme-selection-test");

  di.register(lensDarkThemeInjectable, lensLightThemeInjectable, lensThemesInjectable);

  expect(di.inject(lensThemesInjectable).get(themeName)?.name).toBe(themeName);
});
