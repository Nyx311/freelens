/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import i18n from "@freelensapp/i18n";

const language =
  new URL(window.location.href).searchParams.get("freelensLocale") ??
  sessionStorage.getItem("freelens-ui-language") ??
  navigator.languages[0] ??
  navigator.language;

await i18n.changeLanguage(language);
sessionStorage.setItem("freelens-ui-language", i18n.language);
document.documentElement.lang = i18n.resolvedLanguage ?? "en";

if (i18n.resolvedLanguage?.startsWith("zh")) {
  await import("monaco-editor/nls/lang/zh-cn");
}

await import("./index");
