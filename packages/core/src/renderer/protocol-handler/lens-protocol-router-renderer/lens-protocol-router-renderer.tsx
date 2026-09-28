/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { ipcRenderer } from "electron";
import * as proto from "../../../common/protocol-handler";
import { foldAttemptResults, ProtocolHandlerInvalid, RouteAttempt } from "../../../common/protocol-handler";

import type { ShowNotification } from "@freelensapp/notifications";

import type { LensProtocolRouterDependencies } from "../../../common/protocol-handler";

interface Dependencies extends LensProtocolRouterDependencies {
  showShortInfoNotification: ShowNotification;
  showErrorNotification: ShowNotification;
}

export class LensProtocolRouterRenderer extends proto.LensProtocolRouter {
  constructor(protected readonly dependencies: Dependencies) {
    super(dependencies);
  }

  /**
   * This function is needed to be called early on in the renderers lifetime.
   */
  public init(): void {
    ipcRenderer.on(proto.ProtocolHandlerInternal, (event, rawUrl: string, mainAttemptResult: RouteAttempt) => {
      const rendererAttempt = this._routeToInternal(new URL(rawUrl));

      if (foldAttemptResults(mainAttemptResult, rendererAttempt) === RouteAttempt.MISSING) {
        this.dependencies.showShortInfoNotification(
          <p>{t("Unknown action {{url}}. Are you on the latest version?", { url: rawUrl })}</p>,
        );
      }
    });
    ipcRenderer.on(proto.ProtocolHandlerExtension, async (event, rawUrl: string, mainAttemptResult: RouteAttempt) => {
      const rendererAttempt = await this._routeToExtension(new URL(rawUrl));

      switch (foldAttemptResults(mainAttemptResult, rendererAttempt)) {
        case RouteAttempt.MISSING:
          this.dependencies.showShortInfoNotification(
            <p>{t("Unknown action {{url}}. Are you on the latest version of the extension?", { url: rawUrl })}</p>,
          );
          break;
        case RouteAttempt.MISSING_EXTENSION:
          this.dependencies.showShortInfoNotification(
            <p>
              {t(
                "Missing extension for action {{url}}. Not able to find extension in our known list. Try installing it manually.",
                {
                  url: rawUrl,
                },
              )}
            </p>,
          );
          break;
      }
    });
    ipcRenderer.on(ProtocolHandlerInvalid, (event, error: string, rawUrl: string) => {
      this.dependencies.showErrorNotification(
        <>
          <p>{t("Failed to route {{url}}.", { url: rawUrl })}</p>
          <p>
            <b>{t("Error:")}</b> {error}
          </p>
        </>,
      );
    });
  }
}
