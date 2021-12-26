import { createContext } from 'react';
import { ListGridType } from './index';

const ListGridContext = createContext<{ grid: ListGridType }>({ grid: {} });

export const ListGridContextProvider = ListGridContext.Provider;

export const ListGridContextConsumer = ListGridContext.Consumer;

export default ListGridContext;
