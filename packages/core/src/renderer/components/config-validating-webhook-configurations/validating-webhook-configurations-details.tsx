/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { observer } from "mobx-react";
import React from "react";
import { WebhookConfig } from "../config-mutating-webhook-configurations/webhook-config";
import { DrawerItem, DrawerTitle } from "../drawer";

import type { ValidatingWebhookConfiguration } from "@freelensapp/kube-object";

import type { KubeObjectDetailsProps } from "../kube-object-details";

export interface ValidatingWebhookProps extends KubeObjectDetailsProps<ValidatingWebhookConfiguration> {}

@observer
export class ValidatingWebhookDetails extends React.Component<ValidatingWebhookProps> {
  render() {
    const { object: webhookConfig } = this.props;

    return (
      <div className="ValidatingWebhookDetails">
        <DrawerItem name={t("API version")}>{webhookConfig.apiVersion}</DrawerItem>
        <DrawerTitle>{t("Webhooks")}</DrawerTitle>
        {webhookConfig.getWebhooks()?.length == 0 && <div style={{ opacity: 0.6 }}>{t("No webhooks set")}</div>}
        {webhookConfig.getWebhooks()?.map((webhook) => (
          <WebhookConfig webhook={webhook} key={webhook.name} />
        ))}
      </div>
    );
  }
}
