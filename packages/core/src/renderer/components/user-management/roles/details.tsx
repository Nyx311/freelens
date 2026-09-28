/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import "./details.scss";

import { t } from "@freelensapp/i18n";
import { observer } from "mobx-react";
import React from "react";
import { DrawerTitle } from "../../drawer";

import type { Role } from "@freelensapp/kube-object";

import type { KubeObjectDetailsProps } from "../../kube-object-details";

export interface RoleDetailsProps extends KubeObjectDetailsProps<Role> {}

@observer
export class RoleDetails extends React.Component<RoleDetailsProps> {
  render() {
    const { object: role } = this.props;

    if (!role) return null;
    const rules = role.getRules();

    return (
      <div className="RoleDetails">
        <DrawerTitle>{t("Rules")}</DrawerTitle>
        {rules.map(({ resourceNames, apiGroups, resources, verbs }, index) => {
          return (
            <div className="rule" key={index}>
              {resources && (
                <>
                  <div className="name">{t("Resources")}</div>
                  <div className="value">{resources.join(", ")}</div>
                </>
              )}
              {verbs && (
                <>
                  <div className="name">{t("Verbs")}</div>
                  <div className="value">{verbs.join(", ")}</div>
                </>
              )}
              {apiGroups && (
                <>
                  <div className="name">{t("Api Groups")}</div>
                  <div className="value">
                    {apiGroups.map((apiGroup) => (apiGroup === "" ? `'${apiGroup}'` : apiGroup)).join(", ")}
                  </div>
                </>
              )}
              {resourceNames && (
                <>
                  <div className="name">{t("Resource Names")}</div>
                  <div className="value">{resourceNames.join(", ")}</div>
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
