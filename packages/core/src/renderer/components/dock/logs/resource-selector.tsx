/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import "./resource-selector.scss";

import { observer } from "mobx-react";
import { Badge } from "../../badge";
import { Select } from "../../select";
import { findOptimalDefaultContainerOfPod } from "./default-container-helper";

import type { Container, Pod } from "@freelensapp/kube-object";

import type { SingleValue } from "react-select";

import type { SelectOption } from "../../select";
import type { LogTabViewModel } from "./logs-view-model";

export interface LogResourceSelectorProps {
  model: LogTabViewModel;
}

export const LogResourceSelector = observer(({ model }: LogResourceSelectorProps) => {
  const tabData = model.logTabData.get();

  if (!tabData) {
    return null;
  }

  const { selectedContainer, owner } = tabData;
  const pods = model.pods.get();
  const pod = model.pod.get();

  if (!pod) {
    return null;
  }

  const podOptions = pods.map((pod) => ({
    value: pod,
    label: pod.getName(),
  }));
  const allContainers = pod.getAllContainers();
  const container = allContainers.find((container) => container.name === selectedContainer) ?? null;
  const onContainerChange = (option: SingleValue<SelectOption<Container>>) => {
    if (!option) {
      return;
    }

    model.updateLogTabData({
      selectedContainer: option.value.name,
    });
    model.reloadLogs();
  };

  const onPodChange = (option: SingleValue<SelectOption<Pod>>) => {
    if (!option) {
      return;
    }

    model.updateLogTabData({
      selectedPodId: option.value.getId(),
      selectedContainer: findOptimalDefaultContainerOfPod(option.value)?.name,
    });
    model.renameTab(t("Pod {{name}}", { name: option.value.getName() }));
    model.reloadLogs();
  };

  const containerSelectOptions = [
    {
      label: t("Containers"),
      options: pod.getContainers().map((container) => ({
        value: container,
        label: container.name,
      })),
    },
    {
      label: t("Init Containers"),
      options: pod.getInitContainers().map((container) => ({
        value: container,
        label: container.name,
      })),
    },
  ];

  return (
    <div className="LogResourceSelector flex gap-2 items-center">
      <span>{t("Namespace")}</span> <Badge data-testid="namespace-badge" label={pod.getNs()} />
      {owner && (
        <>
          <span>{t("Owner")}</span> <Badge data-testid="namespace-badge" label={`${owner.kind} ${owner.name}`} />
        </>
      )}
      <span>{t("Pod")}</span>
      <Select
        options={podOptions}
        value={pod}
        isClearable={false}
        onChange={onPodChange}
        className="pod-selector"
        menuClass="pod-selector-menu"
      />
      <span>{t("Container")}</span>
      <Select<Container, SelectOption<Container>, false>
        id="container-selector-input"
        options={containerSelectOptions}
        value={container}
        onChange={onContainerChange}
        className="container-selector"
        menuClass="container-selector-menu"
        controlShouldRenderValue
      />
    </div>
  );
});
