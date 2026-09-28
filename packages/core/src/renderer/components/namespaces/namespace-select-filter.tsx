/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import "./namespace-select-filter.scss";

import { t } from "@freelensapp/i18n";
import { withInjectables } from "@ogre-tools/injectable-react";
import { observer } from "mobx-react";
import { components } from "react-select";
import { Select } from "../select";
import namespaceSelectFilterModelInjectable from "./namespace-select-filter-model/namespace-select-filter-model.injectable";
import namespaceStoreInjectable from "./store.injectable";

import type { PlaceholderProps } from "react-select";

import type {
  NamespaceSelectFilterModel,
  NamespaceSelectFilterOption,
  SelectAllNamespaces,
} from "./namespace-select-filter-model/namespace-select-filter-model";
import type { NamespaceStore } from "./store";

interface NamespaceSelectFilterProps {
  id: string;
}

interface Dependencies {
  model: NamespaceSelectFilterModel;
}

const NonInjectedNamespaceSelectFilter = observer(({ model, id }: Dependencies & NamespaceSelectFilterProps) => (
  <div
    onKeyUp={model.onKeyUp}
    onKeyDown={model.onKeyDown}
    onClick={model.onClick}
    className="NamespaceSelectFilterParent"
    data-testid="namespace-select-filter"
  >
    <Select<string | SelectAllNamespaces, NamespaceSelectFilterOption, true>
      id={id}
      isMulti={true}
      isClearable={false}
      menuIsOpen={model.menu.isOpen.get()}
      components={{ Placeholder }}
      closeMenuOnSelect={false}
      controlShouldRenderValue={false}
      onChange={model.onChange}
      onBlur={model.reset}
      formatOptionLabel={model.formatOptionLabel}
      options={model.options.get()}
      className="NamespaceSelect NamespaceSelectFilter"
      menuClass="NamespaceSelectFilterMenu"
      isOptionSelected={model.isOptionSelected}
      hideSelectedOptions={false}
    />
  </div>
));

export const NamespaceSelectFilter = withInjectables<Dependencies, NamespaceSelectFilterProps>(
  NonInjectedNamespaceSelectFilter,
  {
    getProps: (di, props) => ({
      model: di.inject(namespaceSelectFilterModelInjectable),
      ...props,
    }),
  },
);

export interface CustomPlaceholderProps extends PlaceholderProps<NamespaceSelectFilterOption, true> {}

interface PlaceholderDependencies {
  namespaceStore: NamespaceStore;
}

const NonInjectedPlaceholder = observer(
  ({ namespaceStore, ...props }: CustomPlaceholderProps & PlaceholderDependencies) => {
    const getPlaceholder = () => {
      const namespaces = namespaceStore.contextNamespaces;

      if (namespaceStore.areAllSelectedImplicitly || namespaces.length === 0) {
        return t("All namespaces");
      }

      return namespaces.length === 1
        ? t("Namespace: {{namespaces}}", { namespaces: namespaces.join(", ") })
        : t("Namespaces: {{namespaces}}", { namespaces: namespaces.join(", ") });
    };

    return <components.Placeholder {...props}>{getPlaceholder()}</components.Placeholder>;
  },
);

const Placeholder = withInjectables<PlaceholderDependencies, CustomPlaceholderProps>(NonInjectedPlaceholder, {
  getProps: (di, props) => ({
    namespaceStore: di.inject(namespaceStoreInjectable),
    ...props,
  }),
});
