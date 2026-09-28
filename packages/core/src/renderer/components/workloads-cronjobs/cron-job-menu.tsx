/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { Icon } from "@freelensapp/icon";
import { cronJobApiInjectable } from "@freelensapp/kube-api-specifics";
import { showCheckedErrorNotificationInjectable } from "@freelensapp/notifications";
import { withInjectables } from "@ogre-tools/injectable-react";
import openConfirmDialogInjectable from "../confirm-dialog/open.injectable";
import { MenuItem } from "../menu";
import openCronJobTriggerDialogInjectable from "./trigger-dialog/open.injectable";

import type { CronJobApi } from "@freelensapp/kube-api";
import type { CronJob } from "@freelensapp/kube-object";
import type { ShowCheckedErrorNotification } from "@freelensapp/notifications";

import type { OpenConfirmDialog } from "../confirm-dialog/open.injectable";
import type { KubeObjectMenuProps } from "../kube-object-menu";
import type { OpenCronJobTriggerDialog } from "./trigger-dialog/open.injectable";

export interface CronJobMenuProps extends KubeObjectMenuProps<CronJob> {}

interface Dependencies {
  openConfirmDialog: OpenConfirmDialog;
  openCronJobTriggerDialog: OpenCronJobTriggerDialog;
  cronJobApi: CronJobApi;
  showCheckedErrorNotification: ShowCheckedErrorNotification;
}

const NonInjectedCronJobMenu = ({
  object,
  toolbar,
  openConfirmDialog,
  openCronJobTriggerDialog,
  cronJobApi,
  showCheckedErrorNotification,
}: Dependencies & CronJobMenuProps) => (
  <>
    <MenuItem onClick={() => openCronJobTriggerDialog(object)}>
      <Icon material="play_circle_filled" tooltip={t("Trigger")} interactive={toolbar} />
      <span className="title">{t("Trigger")}</span>
    </MenuItem>

    {object.isSuspend() ? (
      <MenuItem
        onClick={() =>
          openConfirmDialog({
            ok: async () => {
              try {
                await cronJobApi.resume({ namespace: object.getNs(), name: object.getName() });
              } catch (err) {
                showCheckedErrorNotification(err, t("Unknown error occurred while resuming CronJob"));
              }
            },
            labelOk: t("Resume"),
            message: <p>{t("Resume CronJob {{name}}?", { name: object.getName() })}</p>,
          })
        }
      >
        <Icon material="play_circle_outline" tooltip={t("Resume")} interactive={toolbar} />
        <span className="title">{t("Resume")}</span>
      </MenuItem>
    ) : (
      <MenuItem
        onClick={() =>
          openConfirmDialog({
            ok: async () => {
              try {
                await cronJobApi.suspend({ namespace: object.getNs(), name: object.getName() });
              } catch (err) {
                showCheckedErrorNotification(err, t("Unknown error occurred while suspending CronJob"));
              }
            },
            labelOk: t("Suspend"),
            message: <p>{t("Suspend CronJob {{name}}?", { name: object.getName() })}</p>,
          })
        }
      >
        <Icon material="pause_circle_filled" tooltip={t("Suspend")} interactive={toolbar} />
        <span className="title">{t("Suspend")}</span>
      </MenuItem>
    )}
  </>
);

export const CronJobMenu = withInjectables<Dependencies, CronJobMenuProps>(NonInjectedCronJobMenu, {
  getProps: (di, props) => ({
    ...props,
    openConfirmDialog: di.inject(openConfirmDialogInjectable),
    openCronJobTriggerDialog: di.inject(openCronJobTriggerDialogInjectable),
    cronJobApi: di.inject(cronJobApiInjectable),
    showCheckedErrorNotification: di.inject(showCheckedErrorNotificationInjectable),
  }),
});
