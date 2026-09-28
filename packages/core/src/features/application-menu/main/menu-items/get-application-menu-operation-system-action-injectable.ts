/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { getInjectable } from "@ogre-tools/injectable";
import applicationMenuItemInjectionToken from "./application-menu-item-injection-token";

import type { OsActionMenuItem } from "./application-menu-item-injection-token";

const getApplicationMenuOperationSystemActionInjectable = ({ id, label, ...rest }: Omit<OsActionMenuItem, "kind">) =>
  getInjectable({
    id: `application-menu-operation-system-action/${id}`,

    instantiate: () => ({
      ...rest,
      id,
      ...(label ? { label: t(label) } : {}),
      kind: "os-action-menu-item" as const,
    }),

    injectionToken: applicationMenuItemInjectionToken,
  });

export { getApplicationMenuOperationSystemActionInjectable };
