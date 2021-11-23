import React from 'react';
import { RadioGroupContext } from './interface';

const RadioContext = React.createContext<RadioGroupContext>({
  radioGroup: {},
} as RadioGroupContext);

export default RadioContext;
