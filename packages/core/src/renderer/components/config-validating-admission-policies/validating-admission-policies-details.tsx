/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import { observer } from "mobx-react";
import React from "react";
import { DrawerItem, DrawerTitle } from "../drawer";

import type { ValidatingAdmissionPolicy } from "@freelensapp/kube-object";

import type { KubeObjectDetailsProps } from "../kube-object-details";

export interface ValidatingAdmissionPolicyDetailsProps extends KubeObjectDetailsProps<ValidatingAdmissionPolicy> {}

@observer
export class ValidatingAdmissionPolicyDetails extends React.Component<ValidatingAdmissionPolicyDetailsProps> {
  render() {
    const { object: policy } = this.props;

    const paramKind = policy.getParamKind();
    const matchConstraints = policy.getMatchConstraints();
    const validations = policy.getValidations();
    const matchConditions = policy.getMatchConditions();
    const variables = policy.getVariables();
    const auditAnnotations = policy.getAuditAnnotations();

    return (
      <div className="ValidatingAdmissionPolicyDetails">
        <DrawerItem name={t("API version")}>{policy.apiVersion}</DrawerItem>
        <DrawerItem name={t("Failure Policy")}>{policy.getFailurePolicy()}</DrawerItem>
        {paramKind && (
          <DrawerItem name={t("Param Kind")}>
            {[paramKind.apiVersion, paramKind.kind].filter(Boolean).join("/")}
          </DrawerItem>
        )}

        {matchConditions.length > 0 && (
          <>
            <DrawerTitle>{t("Match Conditions")}</DrawerTitle>
            {matchConditions.map((matchCondition) => (
              <DrawerItem name={matchCondition.name} key={matchCondition.name}>
                {matchCondition.expression}
              </DrawerItem>
            ))}
          </>
        )}

        {variables.length > 0 && (
          <>
            <DrawerTitle>{t("Variables")}</DrawerTitle>
            {variables.map((variable) => (
              <DrawerItem name={variable.name} key={variable.name}>
                {variable.expression}
              </DrawerItem>
            ))}
          </>
        )}

        <DrawerTitle>{t("Validations")}</DrawerTitle>
        {validations.length === 0 && <div style={{ opacity: 0.6 }}>{t("No validations set")}</div>}
        {validations.map((validation, index) => (
          <div key={index}>
            <DrawerItem name={t("Expression")}>{validation.expression}</DrawerItem>
            {validation.message && <DrawerItem name={t("Message")}>{validation.message}</DrawerItem>}
            {validation.messageExpression && (
              <DrawerItem name={t("Message Expression")}>{validation.messageExpression}</DrawerItem>
            )}
            {validation.reason && <DrawerItem name={t("Reason")}>{validation.reason}</DrawerItem>}
          </div>
        ))}

        {auditAnnotations.length > 0 && (
          <>
            <DrawerTitle>{t("Audit Annotations")}</DrawerTitle>
            {auditAnnotations.map((auditAnnotation) => (
              <DrawerItem name={auditAnnotation.key} key={auditAnnotation.key}>
                {auditAnnotation.valueExpression}
              </DrawerItem>
            ))}
          </>
        )}

        {matchConstraints && (
          <>
            <DrawerTitle>{t("Match Constraints")}</DrawerTitle>
            {matchConstraints.matchPolicy && (
              <DrawerItem name={t("Match Policy")}>{matchConstraints.matchPolicy}</DrawerItem>
            )}
            <DrawerItem name={t("Resource Rules")}>
              {matchConstraints.resourceRules?.map((rule, index) => (
                <div key={index}>
                  <div>API Groups: {rule.apiGroups.join(", ")}</div>
                  <div>API Versions: {rule.apiVersions?.join(", ")}</div>
                  <div>Operations: {rule.operations.join(", ")}</div>
                  {rule.resources && <div>Resources: {rule.resources.join(", ")}</div>}
                  {rule.resourceNames && <div>Resource Names: {rule.resourceNames.join(", ")}</div>}
                  {rule.scope && <div>Scope: {rule.scope}</div>}
                </div>
              ))}
            </DrawerItem>
          </>
        )}
      </div>
    );
  }
}
