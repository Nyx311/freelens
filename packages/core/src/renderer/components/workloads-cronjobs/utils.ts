/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import i18n, { t } from "@freelensapp/i18n";
import cronstrue from "cronstrue";
import "cronstrue/locales/zh_CN";

import type { CronJob } from "@freelensapp/kube-object";

export function humanizeSchedule(schedule: string): string {
  try {
    const locale = i18n.resolvedLanguage?.startsWith("zh") ? "zh_CN" : "en";

    return cronstrue.toString(schedule, { locale, verbose: true });
  } catch {
    return t("Unrecognized cron expression syntax");
  }
}

export function getScheduleFullDescription(cronJob: CronJob): string {
  const schedule = cronJob.getSchedule().replace(/\s+/g, " ");
  const humanized = humanizeSchedule(schedule);
  return cronJob.isNeverRun()
    ? t("{{schedule}} ({{description}}, never ran)", { schedule, description: humanized })
    : `${schedule} (${humanized})`;
}
