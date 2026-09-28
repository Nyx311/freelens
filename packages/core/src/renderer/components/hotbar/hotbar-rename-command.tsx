/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { withInjectables } from "@ogre-tools/injectable-react";
import { action } from "mobx";
import { observer } from "mobx-react";
import { useState } from "react";
import computeHotbarDisplayLabelInjectable from "../../../features/hotbar/storage/common/compute-display-label.injectable";
import getHotbarByIdInjectable from "../../../features/hotbar/storage/common/get-by-id.injectable";
import hotbarsInjectable from "../../../features/hotbar/storage/common/hotbars.injectable";
import commandOverlayInjectable from "../command-palette/command-overlay.injectable";
import { Input } from "../input";
import uniqueHotbarNameInjectable from "../input/validators/unique-hotbar-name.injectable";
import { Select } from "../select";

import type { IComputedValue } from "mobx";

import type { ComputeHotbarDisplayLabel } from "../../../features/hotbar/storage/common/compute-display-label.injectable";
import type { GetHotbarById } from "../../../features/hotbar/storage/common/get-by-id.injectable";
import type { Hotbar } from "../../../features/hotbar/storage/common/hotbar";
import type { InputValidator } from "../input";

interface Dependencies {
  closeCommandOverlay: () => void;
  getHotbarById: GetHotbarById;
  computeHotbarDisplayLabel: ComputeHotbarDisplayLabel;
  uniqueHotbarName: InputValidator<false>;
  hotbars: IComputedValue<Hotbar[]>;
}

const NonInjectedHotbarRenameCommand = observer(
  ({ closeCommandOverlay, getHotbarById, computeHotbarDisplayLabel, uniqueHotbarName, hotbars }: Dependencies) => {
    const [hotbarId, setHotbarId] = useState("");
    const [hotbarName, setHotbarName] = useState("");

    const onSubmit = action((name: string) => {
      if (!name.trim()) {
        return;
      }

      getHotbarById(hotbarId)?.name.set(name);
      closeCommandOverlay();
    });

    if (hotbarId) {
      return (
        <>
          <Input
            trim={true}
            value={hotbarName}
            onChange={setHotbarName}
            placeholder={t("New hotbar name")}
            autoFocus={true}
            theme="round-black"
            validators={uniqueHotbarName}
            onSubmit={onSubmit}
            showValidationLine={true}
          />
          <small className="hint">
            {t('Please provide a new hotbar name (Press "Enter" to confirm or "Escape" to cancel)')}
          </small>
        </>
      );
    }

    return (
      <Select
        id="rename-hotbar-input"
        menuPortalTarget={null}
        onChange={(option) => {
          if (option) {
            setHotbarId(option.value.id);
            setHotbarName(option.value.name.get());
          }
        }}
        components={{ DropdownIndicator: null, IndicatorSeparator: null }}
        menuIsOpen={true}
        options={hotbars.get().map((hotbar) => ({
          value: hotbar,
          label: computeHotbarDisplayLabel(hotbar),
        }))}
        autoFocus={true}
        escapeClearsValue={false}
        placeholder={t("Rename hotbar")}
      />
    );
  },
);

export const HotbarRenameCommand = withInjectables<Dependencies>(NonInjectedHotbarRenameCommand, {
  getProps: (di, props) => ({
    ...props,
    closeCommandOverlay: di.inject(commandOverlayInjectable).close,
    uniqueHotbarName: di.inject(uniqueHotbarNameInjectable),
    getHotbarById: di.inject(getHotbarByIdInjectable),
    hotbars: di.inject(hotbarsInjectable),
    computeHotbarDisplayLabel: di.inject(computeHotbarDisplayLabelInjectable),
  }),
});
