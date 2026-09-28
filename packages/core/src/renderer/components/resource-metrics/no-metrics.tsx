/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { Icon } from "@freelensapp/icon";

export function NoMetrics() {
  return (
    <div className="flex justify-center items-center">
      <Icon material="info" />
      {` ${t("Metrics not available at the moment")}`}
    </div>
  );
}
