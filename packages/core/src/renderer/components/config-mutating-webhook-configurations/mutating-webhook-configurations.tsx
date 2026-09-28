/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import "./mutating-webhook-configurations.scss";

import { withInjectables } from "@ogre-tools/injectable-react";
import { observer } from "mobx-react";
import { KubeObjectAge } from "../kube-object/age";
import { KubeObjectListLayout } from "../kube-object-list-layout";
import { SiblingsInTabLayout } from "../layout/siblings-in-tab-layout";
import { WithTooltip } from "../with-tooltip";
import mutatingWebhookConfigurationsStoreInjectable from "./mutating-webhook-configuration-store.injectable";

import type { MutatingWebhookConfigurationStore } from "./mutating-webhook-configuration-store";

enum columnId {
  name = "name",
  webhooks = "webhooks",
  age = "age",
}

interface Dependencies {
  store: MutatingWebhookConfigurationStore;
}

const NonInjectedMutatingWebhookConfigurations = observer((props: Dependencies) => {
  return (
    <SiblingsInTabLayout>
      <KubeObjectListLayout
        isConfigurable
        customizeHeader={({ searchProps, ...rest }) => ({
          ...rest,
          searchProps: {
            ...searchProps,
            placeholder: t("Search..."),
          },
        })}
        tableId="config_mutating_webhook_configurations"
        className={"MutatingWebhookConfigurations"}
        store={props.store}
        sortingCallbacks={{
          [columnId.name]: (item) => item.getName(),
          [columnId.webhooks]: (item) => item.getWebhooks().length,
          [columnId.age]: (item) => -item.getCreationTimestamp(),
        }}
        searchFilters={[(item) => item.getSearchFields(), (item) => item.getLabels()]}
        renderHeaderTitle={t("Mutating Webhook Configs")}
        renderTableHeader={[
          {
            title: t("Name"),
            className: "name",
            sortBy: columnId.name,
            id: columnId.name,
          },
          {
            title: t("Webhooks"),
            sortBy: columnId.webhooks,
            id: columnId.webhooks,
          },
          {
            title: t("Age"),
            className: "age",
            sortBy: columnId.age,
            id: columnId.age,
          },
        ]}
        renderTableContents={(item) => [
          <WithTooltip>{item.getName()}</WithTooltip>,
          item.getWebhooks().length,
          <KubeObjectAge key="age" object={item} />,
        ]}
      />
    </SiblingsInTabLayout>
  );
});

export const MutatingWebhookConfigurations = withInjectables<Dependencies>(NonInjectedMutatingWebhookConfigurations, {
  getProps: (di, props) => ({
    ...props,
    store: di.inject(mutatingWebhookConfigurationsStoreInjectable),
  }),
});
