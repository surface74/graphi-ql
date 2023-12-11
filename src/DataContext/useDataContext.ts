import { useContext } from 'react';
import { DataContext } from './DataContext';
import { IDataContext } from './DataContext.types';

export const useDataContext = (): IDataContext => {
  const data = useContext(DataContext);
  if (!data) {
    throw new Error(
      "Can not use 'useDataContext' outside of the 'DataContextProvider'"
    );
  }

  return data;
};
