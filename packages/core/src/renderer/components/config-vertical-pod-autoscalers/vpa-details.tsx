/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { t } from "@freelensapp/i18n";
import "./vpa-details.scss";

import {
  ContainerScalingMode,
  ControlledValues,
  ResourceName,
  UpdateMode,
  VerticalPodAutoscaler,
} from "@freelensapp/kube-object";
import { loggerInjectionToken } from "@freelensapp/logger";
import { Link } from "@freelensapp/routing";
import { cssNames } from "@freelensapp/utilities";
import { withInjectables } from "@ogre-tools/injectable-react";
import { startCase } from "es-toolkit";
import { observer } from "mobx-react";
import React from "react";
import apiManagerInjectable from "../../../common/k8s-api/api-manager/manager.injectable";
import { Badge } from "../badge";
import { DrawerItem, DrawerTitle } from "../drawer";
import getDetailsUrlInjectable from "../kube-detail-params/get-details-url.injectable";

import type { PodResourcePolicy, PodUpdatePolicy, VerticalPodAutoscalerStatus } from "@freelensapp/kube-object";
import type { Logger } from "@freelensapp/logger";

import type { ApiManager } from "../../../common/k8s-api/api-manager";
import type { GetDetailsUrl } from "../kube-detail-params/get-details-url.injectable";
import type { KubeObjectDetailsProps } from "../kube-object-details";

export interface VpaDetailsProps extends KubeObjectDetailsProps<VerticalPodAutoscaler> {}

interface Dependencies {
  apiManager: ApiManager;
  getDetailsUrl: GetDetailsUrl;
  logger: Logger;
}

@observer
class NonInjectedVpaDetails extends React.Component<VpaDetailsProps & Dependencies> {
  renderStatus(status: VerticalPodAutoscalerStatus) {
    const { recommendation } = status;
    const { object: vpa } = this.props;

    return (
      <div>
        <DrawerTitle>{t("Status")}</DrawerTitle>
        <DrawerItem name={t("Status")} className="status" labelsOnly>
          {vpa.getReadyConditions().map(({ type, tooltip, isReady }) => (
            <Badge key={type} label={type} tooltip={tooltip} className={cssNames({ [type]: isReady })} />
          ))}
        </DrawerItem>

        {recommendation?.containerRecommendations &&
          recommendation.containerRecommendations.map(
            ({ containerName, target, lowerBound, upperBound, uncappedTarget }) => (
              <div key={containerName}>
                <DrawerTitle>
                  {t("Container Recommendation for {{name}}", { name: containerName ?? t("Unknown") })}
                </DrawerTitle>
                <DrawerItem name={t("target")}>
                  {Object.entries(target).map(([name, value]) => (
                    <DrawerItem key={name} name={startCase(name)}>
                      {value}
                    </DrawerItem>
                  ))}
                </DrawerItem>
                {lowerBound && (
                  <DrawerItem name={t("lowerBound")}>
                    {Object.entries(lowerBound).map(([name, value]) => (
                      <DrawerItem key={name} name={startCase(name)}>
                        {value}
                      </DrawerItem>
                    ))}
                  </DrawerItem>
                )}
                {upperBound && (
                  <DrawerItem name={t("upperBound")}>
                    {Object.entries(upperBound).map(([name, value]) => (
                      <DrawerItem key={name} name={startCase(name)}>
                        {value}
                      </DrawerItem>
                    ))}
                  </DrawerItem>
                )}
                {uncappedTarget && (
                  <DrawerItem name={t("uncappedTarget")}>
                    {Object.entries(uncappedTarget).map(([name, value]) => (
                      <DrawerItem key={name} name={startCase(name)}>
                        {value}
                      </DrawerItem>
                    ))}
                  </DrawerItem>
                )}
              </div>
            ),
          )}
      </div>
    );
  }

  renderUpdatePolicy(updatePolicy: PodUpdatePolicy) {
    return (
      <div>
        <DrawerTitle>{t("Update Policy")}</DrawerTitle>
        <DrawerItem name={t("updateMode")}>{updatePolicy?.updateMode ?? UpdateMode.UpdateModeAuto}</DrawerItem>
        <DrawerItem name={t("minReplicas")}>{updatePolicy?.minReplicas}</DrawerItem>
      </div>
    );
  }

  renderResourcePolicy(resourcePolicy: PodResourcePolicy) {
    return (
      <div>
        {resourcePolicy.containerPolicies && (
          <div>
            {resourcePolicy.containerPolicies.map(
              ({ containerName, mode, minAllowed, maxAllowed, controlledResources, controlledValues }) => {
                return (
                  <div key={containerName}>
                    <DrawerTitle>
                      {t("Container Policy for {{name}}", { name: containerName ?? t("Unknown") })}
                    </DrawerTitle>
                    <DrawerItem name={t("Mode")}>{mode ?? ContainerScalingMode.ContainerScalingModeAuto}</DrawerItem>
                    {minAllowed && (
                      <DrawerItem name={t("minAllowed")}>
                        {Object.entries(minAllowed).map(([name, value]) => (
                          <DrawerItem key={name} name={startCase(name)}>
                            {value}
                          </DrawerItem>
                        ))}
                      </DrawerItem>
                    )}
                    {maxAllowed && (
                      <DrawerItem name={t("maxAllowed")}>
                        {Object.entries(maxAllowed).map(([name, value]) => (
                          <DrawerItem key={name} name={startCase(name)}>
                            {value}
                          </DrawerItem>
                        ))}
                      </DrawerItem>
                    )}
                    <DrawerItem name={t("controlledResources")}>
                      {controlledResources?.length
                        ? controlledResources.join(", ")
                        : `${ResourceName.ResourceCPU}, ${ResourceName.ResourceMemory}`}
                    </DrawerItem>
                    <DrawerItem name={t("controlledValues")}>
                      {controlledValues ?? ControlledValues.ControlledValueRequestsAndLimits}
                    </DrawerItem>
                  </div>
                );
              },
            )}
          </div>
        )}
      </div>
    );
  }

  render() {
    const { object: vpa, apiManager, getDetailsUrl, logger } = this.props;

    if (!vpa) {
      return null;
    }

    if (!(vpa instanceof VerticalPodAutoscaler)) {
      logger.error("[VpaDetails]: passed object that is not an instanceof VerticalPodAutoscaler", vpa);

      return null;
    }

    const { targetRef, recommenders, resourcePolicy, updatePolicy } = vpa.spec;

    return (
      <div className="VpaDetails">
        <DrawerItem name={t("Reference")}>
          {targetRef && (
            <Link to={getDetailsUrl(apiManager.lookupApiLink(targetRef, vpa))}>
              {targetRef.kind}/{targetRef.name}
            </Link>
          )}
        </DrawerItem>

        <DrawerItem name={t("Recommender")}>
          {
            /* according to the spec there can be 0 or 1 recommenders, only */
            recommenders?.length ? recommenders[0].name : "default"
          }
        </DrawerItem>

        {vpa.status && this.renderStatus(vpa.status)}
        {updatePolicy && this.renderUpdatePolicy(updatePolicy)}
        {resourcePolicy && this.renderResourcePolicy(resourcePolicy)}

        <DrawerTitle>{t("CRD details")}</DrawerTitle>
      </div>
    );
  }
}

export const VpaDetails = withInjectables<Dependencies, VpaDetailsProps>(NonInjectedVpaDetails, {
  getProps: (di, props) => ({
    ...props,
    apiManager: di.inject(apiManagerInjectable),
    getDetailsUrl: di.inject(getDetailsUrlInjectable),
    logger: di.inject(loggerInjectionToken),
  }),
});
