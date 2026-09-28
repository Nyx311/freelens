/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import "./lease-details.scss";

import { observer } from "mobx-react";
import React from "react";
import { DrawerItem } from "../drawer";

import type { Lease } from "@freelensapp/kube-object";

import type { KubeObjectDetailsProps } from "../kube-object-details";

export interface LeaseDetailsProps extends KubeObjectDetailsProps<Lease> {}

@observer
export class LeaseDetails extends React.Component<LeaseDetailsProps> {
  render() {
    const { object: lease } = this.props;

    return (
      <div className="LeaseDetails">
        <DrawerItem name={t("Holder Identity")}>{lease.getHolderIdentity()}</DrawerItem>

        <DrawerItem name={t("Lease Duration Seconds")}>{lease.getLeaseDurationSeconds()}</DrawerItem>

        <DrawerItem name={t("Lease Transitions")} hidden={lease.getLeaseTransitions() === undefined}>
          {lease.getLeaseTransitions()}
        </DrawerItem>

        <DrawerItem name={t("Acquire Time")} hidden={lease.getAcquireTime() === ""}>
          {lease.getAcquireTime()}
        </DrawerItem>

        <DrawerItem name={t("Renew Time")}>{lease.getRenewTime()}</DrawerItem>
      </div>
    );
  }
}
