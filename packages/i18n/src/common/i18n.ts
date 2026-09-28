/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import i18n from "i18next";
import en from "./locales/en.json";
import zhCN from "./locales/zh-CN.json";

void i18n.init({
  lng: "en",
  fallbackLng: "en",
  initAsync: false,
  keySeparator: false,
  nsSeparator: false,
  returnEmptyString: false,
  interpolation: { escapeValue: false },
  resources: {
    en: { translation: en },
    zh: { translation: zhCN },
    "zh-CN": { translation: zhCN },
  },
});

export { t } from "i18next";
export default i18n;
