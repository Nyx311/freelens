/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { podListLayoutColumnInjectionToken } from "@freelensapp/list-layout";
import { getInjectable } from "@ogre-tools/injectable";
import { LinkToNode } from "../../kube-object-link";
import { WithTooltip } from "../../with-tooltip";
import { COLUMN_PRIORITY } from "./column-priority";

export const podsNodeColumnInjectable = getInjectable({
  id: "pods-node-column",
  instantiate: (di) => {
    const columnId = "node";

    return {
      id: columnId,
      kind: "Pod",
      apiVersion: "v1",
      priority: COLUMN_PRIORITY.NODE,
      content: (pod) => (
        <WithTooltip>
          <LinkToNode name={pod.getNodeName()} />
        </WithTooltip>
      ),
      header: { title: t("Node"), className: "node", sortBy: columnId, id: columnId },
      sortingCallBack: (pod) => pod.getNodeName(),
    };
  },
  injectionToken: podListLayoutColumnInjectionToken,
});
