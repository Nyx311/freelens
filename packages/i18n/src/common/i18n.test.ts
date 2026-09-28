/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import i18n, { t } from "./i18n";

afterEach(async () => {
  await i18n.changeLanguage("en");
});

describe("built-in application translations", () => {
  it("uses the Simplified Chinese catalog for Chinese system language variants", async () => {
    await i18n.changeLanguage("zh-SG");

    expect(t("Save")).toBe("保存");
  });

  it("falls back to English for an unavailable language", async () => {
    await i18n.changeLanguage("fr-FR");

    expect(t("Save")).toBe("Save");
  });

  it("keeps interpolated resource names intact for React to escape", async () => {
    await i18n.changeLanguage("zh-CN");

    expect(t("Open {{productName}}", { productName: "<app>&" })).toBe("打开 <app>&");
  });

  it("keeps untranslated messages readable, including punctuation", async () => {
    await i18n.changeLanguage("zh-CN");

    expect(t("New message: {{name}}.", { name: "example" })).toBe("New message: example.");
  });
});
