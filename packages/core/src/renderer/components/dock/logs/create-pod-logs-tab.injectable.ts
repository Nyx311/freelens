/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { getInjectable } from "@ogre-tools/injectable";
import createLogsTabInjectable from "./create-logs-tab.injectable";

import type { Container, Pod } from "@freelensapp/kube-object";

import type { TabId } from "../dock/store";

export interface PodLogsTabData {
  selectedPod: Pod;
  selectedContainer: Container;
}

const createPodLogsTabInjectable = getInjectable({
  id: "create-pod-logs-tab",

  instantiate: (di) => {
    const createLogsTab = di.inject(createLogsTabInjectable);

    return ({ selectedPod, selectedContainer }: PodLogsTabData): TabId =>
      createLogsTab(t("Pod {{name}}", { name: selectedPod.getName() }), {
        owner: selectedPod.getOwnerRefs()[0],
        namespace: selectedPod.getNs(),
        selectedContainer: selectedContainer.name,
        selectedPodId: selectedPod.getId(),
      });
  },
});

export default createPodLogsTabInjectable;
