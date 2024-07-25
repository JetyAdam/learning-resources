import React, { useState } from 'react';
import { InputGroup, InputGroupItem, InputGroupText, TextInput } from '@patternfly/react-core';
import { FilterIcon, SortAmountDownAltIcon } from '@patternfly/react-icons';

export const GlobalLearningResourcesInput = () => {
  const [value, setValue] = useState('');

  return (
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
  );
};

export default GlobalLearningResourcesInput;
