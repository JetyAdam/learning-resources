import React, { useState } from 'react';
import { TextInput } from '@patternfly/react-core';

export const GlobalLearningResourcesInput = () => {
  const [value, setValue] = useState('');

  return (
    <div className="lr-c-global-learning-resources-page__sidebar-input">
      <TextInput
        value={value}
        type="text"
        onChange={(_event, value) => setValue(value)}
        placeholder="Find by name ..."
      />
    </div>
  );
};

export default GlobalLearningResourcesInput;
