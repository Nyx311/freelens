/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { isObject, json } from "@freelensapp/utilities";
import { getInjectable } from "@ogre-tools/injectable";
import execHelmInjectable from "../exec-helm/exec-helm.injectable";

import type { AsyncResult } from "@freelensapp/utilities";

import type { HelmReleaseData } from "../../../features/helm-releases/common/channels";

export type GetHelmReleaseData = (
  name: string,
  namespace: string,
  kubeconfigPath: string,
) => AsyncResult<HelmReleaseData, string>;

const getHelmReleaseDataInjectable = getInjectable({
  id: "get-helm-release-data",
  instantiate: (di): GetHelmReleaseData => {
    const execHelm = di.inject(execHelmInjectable);

    return async (releaseName, namespace, proxyKubeconfigPath) => {
      const result = await execHelm([
        "status",
        releaseName,
        "--namespace",
        namespace,
        "--kubeconfig",
        proxyKubeconfigPath,
        "--output",
        "json",
      ]);

      if (!result.callWasSuccessful) {
        return {
          callWasSuccessful: false,
          error: t("Failed to execute helm: {{error}}", { error: result.error }),
        };
      }

      const parseResult = json.parse(result.response);

      if (!parseResult.callWasSuccessful) {
        return {
          callWasSuccessful: false,
          error: t("Failed to parse helm response: {{error}}", { error: parseResult.error }),
        };
      }

      const release = parseResult.response;

      if (!isObject(release) || Array.isArray(release)) {
        return {
          callWasSuccessful: false,
          error: t("Helm response is not an object: {{response}}", { response: JSON.stringify(release) }),
        };
      }

      return {
        callWasSuccessful: true,
        response: release as unknown as HelmReleaseData,
      };
    };
  },
});

export default getHelmReleaseDataInjectable;
