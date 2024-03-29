import React from 'react';
import { RadioGroupContextProps } from './interface';

const RadioContext = React.createContext<RadioGroupContextProps | null>(null);

export const RadioContextProvider = RadioContext.Provider;

export default RadioContext;
