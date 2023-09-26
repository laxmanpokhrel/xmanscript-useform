import * as React from 'react';
import { ContextValueType } from '../@types';

const formContext = React.createContext<ContextValueType | undefined>(undefined);

export default formContext;
