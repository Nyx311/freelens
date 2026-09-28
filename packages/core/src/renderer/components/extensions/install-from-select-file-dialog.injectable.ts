/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { getInjectable } from "@ogre-tools/injectable";
import directoryForDownloadsInjectable from "../../../common/app-paths/directory-for-downloads/directory-for-downloads.injectable";
import openPathPickingDialogInjectable from "../../../features/path-picking-dialog/renderer/pick-paths.injectable";
import attemptInstallsInjectable from "./attempt-installs.injectable";
import { supportedExtensionFormats } from "./supported-extension-formats";

export type InstallFromSelectFileDialog = () => Promise<void>;

const installFromSelectFileDialogInjectable = getInjectable({
  id: "install-from-select-file-dialog",

  instantiate: (di): InstallFromSelectFileDialog => {
    const attemptInstalls = di.inject(attemptInstallsInjectable);
    const directoryForDownloads = di.inject(directoryForDownloadsInjectable);
    const openPathPickingDialog = di.inject(openPathPickingDialogInjectable);

    return () =>
      openPathPickingDialog({
        defaultPath: directoryForDownloads,
        properties: ["openFile", "multiSelections"],
        message: t("Select extensions to install (formats: {{formats}})", {
          formats: supportedExtensionFormats.join(", "),
        }),
        buttonLabel: t("Use configuration"),
        filters: [{ name: t("tarball"), extensions: supportedExtensionFormats }],
        onPick: attemptInstalls,
      });
  },
});

export default installFromSelectFileDialogInjectable;
