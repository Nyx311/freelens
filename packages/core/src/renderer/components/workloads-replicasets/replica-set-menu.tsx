/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { Icon } from "@freelensapp/icon";
import { withInjectables } from "@ogre-tools/injectable-react";
import { MenuItem } from "../menu";
import openReplicaSetScaleDialogInjectable from "./scale-dialog/open.injectable";

import type { ReplicaSet } from "@freelensapp/kube-object";

import type { KubeObjectMenuProps } from "../kube-object-menu";
import type { OpenReplicaSetScaleDialog } from "./scale-dialog/open.injectable";

export interface ReplicaSetMenuProps extends KubeObjectMenuProps<ReplicaSet> {}

interface Dependencies {
  openReplicaSetScaleDialog: OpenReplicaSetScaleDialog;
}

const NonInjectedReplicaSetMenu = ({
  object,
  toolbar,
  openReplicaSetScaleDialog,
}: Dependencies & ReplicaSetMenuProps) => (
  <>
    <MenuItem onClick={() => openReplicaSetScaleDialog(object)}>
      <Icon material="open_with" tooltip={t("Scale")} interactive={toolbar} />
      <span className="title">{t("Scale")}</span>
    </MenuItem>
  </>
);

export const ReplicaSetMenu = withInjectables<Dependencies, ReplicaSetMenuProps>(NonInjectedReplicaSetMenu, {
  getProps: (di, props) => ({
    ...props,
    openReplicaSetScaleDialog: di.inject(openReplicaSetScaleDialogInjectable),
  }),
});
