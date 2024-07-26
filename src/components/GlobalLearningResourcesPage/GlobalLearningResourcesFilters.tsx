import React, { useState } from 'react';
import { InputGroup, InputGroupItem, InputGroupText, TextInput, Flex, FlexItem, Text, TextVariants, TextContent, Stack, StackItem, Checkbox } from '@patternfly/react-core';
import { AngleDownIcon, FilterIcon, SortAmountDownAltIcon } from '@patternfly/react-icons';
import { right } from '@patternfly/react-core/dist/esm/helpers/Popper/thirdparty/popper-core';
import './GlobalLearningResourcesFilters.scss';

export const GlobalLearningResourcesFilters = () => {
  const [value, setValue] = useState('');
  return (
    <Stack className="lr-c-global-learning-resources-page__filters">
      <InputGroup>
      <InputGroupText><FilterIcon /></InputGroupText>
      <TextInput
        value={value}
        type="text"
        onChange={(_event, value) => setValue(value)}
        placeholder="Find by name ..."
      />
      <InputGroupText isPlain><SortAmountDownAltIcon /></InputGroupText>
    </InputGroup>
      <TextContent>
      <Flex className="pf-u-mt-md" justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }}>
        <FlexItem><Text component={TextVariants.h6}><AngleDownIcon />Product families</Text></FlexItem>
        <FlexItem align={{ default: 'alignRight' }}><Text component={TextVariants.small}>Clear filters</Text></FlexItem>
      </Flex>
      <Stack>
        <Text component={TextVariants.small} className="pf-u-mb-0">Platforms</Text>
          <Checkbox label={<div className="lr-c-global-learning-resources-page__filters--checkbox"><img className="lr-c-global-learning-resources-page__filters--checkbox-icon" src='/apps/frontend-assets/console-landing/ansible.svg' />Ansible</div>} id="ansible" />
          <Checkbox label={<div className="lr-c-global-learning-resources-page__filters--checkbox"><img className="lr-c-global-learning-resources-page__filters--checkbox-icon" src='/apps/frontend-assets/console-landing/openshift.svg' />OpenShift</div>} id="openshift" />
          <Checkbox label={<div className="lr-c-global-learning-resources-page__filters--checkbox"><img className="lr-c-global-learning-resources-page__filters--checkbox-icon" src='/apps/frontend-assets/console-landing/openshift.svg' />RHEL (Red Hat Enterprise Linux)</div>} id="rhel" />
      
          <Text component={TextVariants.small} className="pf-u-mb-0">SaaS services</Text>
          <Checkbox label={<div className="lr-c-global-learning-resources-page__filters--checkbox"><img className="lr-c-global-learning-resources-page__filters--checkbox-icon" src='/apps/frontend-assets/console-landing/generic.svg' />Quay.io</div>} id="quay" />
      
          <Text component={TextVariants.small} className="pf-u-mb-0">Console-wide services</Text>
          <Checkbox label={<div className="lr-c-global-learning-resources-page__filters--checkbox"><img className="lr-c-global-learning-resources-page__filters--checkbox-icon" src='../../icons/RH-icon-border.svg' />IAM (Identity and Access Management)</div>} id="iam" />
          <Checkbox label={<div className="lr-c-global-learning-resources-page__filters--checkbox"><img className="lr-c-global-learning-resources-page__filters--checkbox-icon" src='../../icons/RH-icon-border.svg' />Console settings</div>} id="console-settings" />
          <Checkbox label={<div className="lr-c-global-learning-resources-page__filters--checkbox"><img className="lr-c-global-learning-resources-page__filters--checkbox-icon" src='../../icons/RH-icon-border.svg' />Subscription services</div>} id="Subscription services" />

          <Text component={TextVariants.h6}><AngleDownIcon />Content type</Text>
          <Checkbox label="Documentation" id="documentation" />
          <Checkbox label="Learning paths" id="learning-paths" />
          <Checkbox label="Quickstarts" id="quickstarts" />
          <Checkbox label="Other content types" id="other-content-types" />

          <Text component={TextVariants.h6}><AngleDownIcon />Use case</Text>
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
      </Stack>
      {/* <div className="lr-c-global-learning-resources-page__filters-container">
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
      </div> */}
      </TextContent>
    </Stack>
  );
};

export default GlobalLearningResourcesFilters;
