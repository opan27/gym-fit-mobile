import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

type Props = { children: React.ReactNode };

export const AppProviders: React.FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
