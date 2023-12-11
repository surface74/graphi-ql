import { createContext } from 'react';
import { IDataContext } from './DataContext.types';

export const DataContext = createContext<IDataContext | null>(null);
