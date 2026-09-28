/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import "./runtime-classes.scss";

import { observer } from "mobx-react";
import React from "react";
import { Badge } from "../badge";
import { DrawerItem } from "../drawer";
import { RuntimeClassDetailsTolerations } from "./runtime-classes-details-tolerations";

import type { RuntimeClass } from "@freelensapp/kube-object";

import type { KubeObjectDetailsProps } from "../kube-object-details";

export interface RuntimeClassesDetailsProps extends KubeObjectDetailsProps<RuntimeClass> {}

@observer
export class RuntimeClassesDetails extends React.Component<RuntimeClassesDetailsProps> {
  render() {
    const { object: rc } = this.props;
    const nodeSelector = rc.getNodeSelectors();

    return (
      <div className="RuntimeClassesDetails">
        <DrawerItem name={t("Handler")}>{rc.getHandler()}</DrawerItem>

        <DrawerItem name={t("Pod Fixed")} hidden={rc.getPodFixed() === ""}>
          {rc.getPodFixed()}
        </DrawerItem>

        <DrawerItem name={t("Node Selector")} hidden={nodeSelector.length === 0}>
          {nodeSelector.map((label) => (
            <Badge key={label} label={label} />
          ))}
        </DrawerItem>

        <RuntimeClassDetailsTolerations runtimeClass={rc} />
      </div>
    );
  }
}
