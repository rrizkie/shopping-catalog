'use client'

import { useMemo } from "react"
import { queryClient } from "@/services/queryClient"
import { QueryClientProvider } from "@tanstack/react-query"
import { Provider as ReduxProvider } from "react-redux"
import store from "@/store/index"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react";


// persistStore(store)

const Provider = ({ children }: { children: React.ReactNode }) => {
    const persistor = useMemo(() => persistStore(store), []);

    return (
        <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </PersistGate>
        </ReduxProvider>
    )
}

export default Provider