import React from 'react';
import './GlobalLearningResourcesFilters.scss';
import { Stack, StackItem, Checkbox } from '@patternfly/react-core';

export const GlobalLearningResourcesFilters = () => {
  return (
    <Stack className="lr-c-global-learning-resources-page__filters">
      <h3>Product families</h3>
      <div className="lr-c-global-learning-resources-page__filters-container">
        <span>Platforms</span>
        <div>
          <Checkbox label="Ansible" id="ansible" />
        </div>
        <div>
          <Checkbox label="OpenShift" id="openshift" />
        </div>
        <div>
          <Checkbox label="RHEL (Red Hat Enterprise Linux)" id="rhel" />
        </div>
      </div>
      <div className="lr-c-global-learning-resources-page__filters-container">
        <span>SaaS services</span>
        <div>
          <Checkbox label="Edge Management" id="edge-management" />
        </div>
        <div>
          <Checkbox
            label="Application and Data Services"
            id="application-data-services"
          />
        </div>
        <div>
          <Checkbox label="Quay.io" id="quay" />
        </div>
      </div>
      <div className="lr-c-global-learning-resources-page__filters-container">
        <span>Control-wide services</span>
        <div>
          <Checkbox label="IAM (Identity and Access Management)" id="iam" />
        </div>
        <div>
          <Checkbox label="Console settings" id="console-settings" />
        </div>
        <div>
          <Checkbox label="Subscription services" id="subscription-services" />
        </div>
      </div>
      <div className="lr-c-global-learning-resources-page__filters-container">
        <span>Content type</span>
        <Checkbox label="Documentation" id="documentation" />
        <Checkbox label="Learning Paths" id="learning-paths" />
        <Checkbox label="Other content types" id="other-content-types" />
        <Checkbox label="Quickstarts" id="quickstarts" />
        <Checkbox label="Related to my subscriptions" id="subscriptions" />
      </div>
      <div className="lr-c-global-learning-resources-page__filters-container">
        <span>Use cases</span>
        <Checkbox label="Application services" id="application-services" />
        <Checkbox label="Automation" id="automation" />
        <Checkbox label="Clusters" id="clusters" />
        <Checkbox label="Containers" id="containers" />
        <Checkbox label="Data services" id="data-services" />
        <Checkbox label="Deploy" id="deploy" />
        <Checkbox label="Images" id="images" />
        <Checkbox label="Infrastructure" id="infrastructure" />
        <Checkbox label="Observability" id="observability" />
        <Checkbox label="Security" id="security" />
        <Checkbox label="Spend management" id="spend-management" />
        <Checkbox label="System configuration" id="system-configuration" />
      </div>
    </Stack>
  );
};

export default GlobalLearningResourcesFilters;
