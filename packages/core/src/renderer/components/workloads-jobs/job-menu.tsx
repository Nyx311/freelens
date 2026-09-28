/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { Icon } from "@freelensapp/icon";
import { jobApiInjectable } from "@freelensapp/kube-api-specifics";
import { showCheckedErrorNotificationInjectable } from "@freelensapp/notifications";
import { withInjectables } from "@ogre-tools/injectable-react";
import openConfirmDialogInjectable from "../confirm-dialog/open.injectable";
import { MenuItem } from "../menu";

import type { JobApi } from "@freelensapp/kube-api";
import type { Job } from "@freelensapp/kube-object";
import type { ShowCheckedErrorNotification } from "@freelensapp/notifications";

import type { OpenConfirmDialog } from "../confirm-dialog/open.injectable";
import type { KubeObjectMenuProps } from "../kube-object-menu";

export interface JobMenuProps extends KubeObjectMenuProps<Job> {}

interface Dependencies {
  openConfirmDialog: OpenConfirmDialog;
  jobApi: JobApi;
  showCheckedErrorNotification: ShowCheckedErrorNotification;
}

const NonInjectedJobMenu = ({
  object,
  toolbar,
  openConfirmDialog,
  jobApi,
  showCheckedErrorNotification,
}: Dependencies & JobMenuProps) => (
  <>
    {object.isSuspend() ? (
      <MenuItem
        onClick={() =>
          openConfirmDialog({
            ok: async () => {
              try {
                await jobApi.resume({ namespace: object.getNs(), name: object.getName() });
              } catch (err) {
                showCheckedErrorNotification(err, t("Unknown error occurred while resuming Job"));
              }
            },
            labelOk: t("Resume"),
            message: <p>{t("Resume Job {{name}}?", { name: object.getName() })}</p>,
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
                await jobApi.suspend({ namespace: object.getNs(), name: object.getName() });
              } catch (err) {
                showCheckedErrorNotification(err, t("Unknown error occurred while suspending Job"));
              }
            },
            labelOk: t("Suspend"),
            message: <p>{t("Suspend Job {{name}}?", { name: object.getName() })}</p>,
          })
        }
      >
        <Icon material="pause_circle_filled" tooltip={t("Suspend")} interactive={toolbar} />
        <span className="title">{t("Suspend")}</span>
      </MenuItem>
    )}
  </>
);

export const JobMenu = withInjectables<Dependencies, JobMenuProps>(NonInjectedJobMenu, {
  getProps: (di, props) => ({
    ...props,
    openConfirmDialog: di.inject(openConfirmDialogInjectable),
    jobApi: di.inject(jobApiInjectable),
    showCheckedErrorNotification: di.inject(showCheckedErrorNotificationInjectable),
  }),
});
