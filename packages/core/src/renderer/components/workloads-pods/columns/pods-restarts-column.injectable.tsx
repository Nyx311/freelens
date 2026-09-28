/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { podListLayoutColumnInjectionToken } from "@freelensapp/list-layout";
import { getInjectable } from "@ogre-tools/injectable";
import { COLUMN_PRIORITY } from "./column-priority";

const columnId = "restarts";

export const podsRestartsColumnInjectable = getInjectable({
  id: "pods-restarts-column",
  instantiate: () => ({
    id: columnId,
    kind: "Pod",
    apiVersion: "v1",
    priority: COLUMN_PRIORITY.RESTARTS,
    content: (pod) => pod.getRestartsCount(),
    header: { title: t("Restarts"), className: "restarts", sortBy: columnId, id: columnId },
    sortingCallBack: (pod) => pod.getRestartsCount(),
  }),
  injectionToken: podListLayoutColumnInjectionToken,
});
