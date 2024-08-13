"use client"
import React from 'react';
import {NextUIProvider} from "@nextui-org/react";

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster, toast } from 'sonner'

import {Provider} from "react-redux";
import store from "~/store";


const AppProvider = ({children}:Readonly<{
    children: React.ReactNode;
}>) => {

    return (
        <NextUIProvider >
            <Toaster  closeButton={true} position={'top-center'} />
            <Provider store={store}>


                {children}
            </Provider>

        </NextUIProvider>
    );
};

export default AppProvider;