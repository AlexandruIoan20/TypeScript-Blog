'use client'; 

import React from 'react'; 
import store from './store';
import { Provider } from 'react-redux';
import { ReactNode } from 'react';

interface Props { 
    children: ReactNode, 
}

const Providers = ({ children }: Props) => {
  return (
    <Provider store = { store }>
        { children }
    </Provider>
  )
}

export default Providers; 