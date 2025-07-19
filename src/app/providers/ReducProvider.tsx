'use client'
import { Store } from "@/lib/redux/Store"
import { Provider } from "react-redux"

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={Store}>{children}</Provider>
}

export default ReduxProvider;