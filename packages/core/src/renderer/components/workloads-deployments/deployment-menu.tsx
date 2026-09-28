/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { Icon } from "@freelensapp/icon";
import { deploymentApiInjectable } from "@freelensapp/kube-api-specifics";
import { showCheckedErrorNotificationInjectable } from "@freelensapp/notifications";
import { withInjectables } from "@ogre-tools/injectable-react";
import openConfirmDialogInjectable from "../confirm-dialog/open.injectable";
import { MenuItem } from "../menu";
import openDeploymentScaleDialogInjectable from "./scale/open.injectable";

import type { DeploymentApi } from "@freelensapp/kube-api";
import type { Deployment } from "@freelensapp/kube-object";
import type { ShowCheckedErrorNotification } from "@freelensapp/notifications";

import type { OpenConfirmDialog } from "../confirm-dialog/open.injectable";
import type { KubeObjectMenuProps } from "../kube-object-menu";
import type { OpenDeploymentScaleDialog } from "./scale/open.injectable";

export interface DeploymentMenuProps extends KubeObjectMenuProps<Deployment> {}

interface Dependencies {
  openDeploymentScaleDialog: OpenDeploymentScaleDialog;
  deploymentApi: DeploymentApi;
  openConfirmDialog: OpenConfirmDialog;
  showCheckedErrorNotification: ShowCheckedErrorNotification;
}

const NonInjectedDeploymentMenu = ({
  deploymentApi,
  object,
  openDeploymentScaleDialog,
  toolbar,
  openConfirmDialog,
  showCheckedErrorNotification,
}: Dependencies & DeploymentMenuProps) => (
  <>
    <MenuItem onClick={() => openDeploymentScaleDialog(object)}>
      <Icon material="open_with" tooltip={t("Scale")} interactive={toolbar} />
      <span className="title">{t("Scale")}</span>
    </MenuItem>
    <MenuItem
      onClick={() =>
        openConfirmDialog({
          ok: async () => {
            try {
              await deploymentApi.restart({
                namespace: object.getNs(),
                name: object.getName(),
              });
            } catch (err) {
              showCheckedErrorNotification(err, t("Unknown error occurred while restarting deployment"));
            }
          },
          labelOk: t("Restart"),
          message: <p>{t("Are you sure you want to restart deployment {{name}}?", { name: object.getName() })}</p>,
        })
      }
    >
      <Icon material="autorenew" tooltip={t("Restart")} interactive={toolbar} />
      <span className="title">{t("Restart")}</span>
    </MenuItem>
  </>
);

export const DeploymentMenu = withInjectables<Dependencies, DeploymentMenuProps>(NonInjectedDeploymentMenu, {
  getProps: (di, props) => ({
    ...props,
    deploymentApi: di.inject(deploymentApiInjectable),
    openDeploymentScaleDialog: di.inject(openDeploymentScaleDialogInjectable),
    openConfirmDialog: di.inject(openConfirmDialogInjectable),
    showCheckedErrorNotification: di.inject(showCheckedErrorNotificationInjectable),
  }),
});
