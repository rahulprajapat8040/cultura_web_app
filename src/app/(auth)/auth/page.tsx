'use client'
import { useSearchParams } from "next/navigation";
import AuthPage from "./AuthPage";

const Auth = () => {
    const searchParams = useSearchParams()
    const authType = searchParams.get("authType")
    return (
        <AuthPage authType={authType} />
    )
}

export default Auth;