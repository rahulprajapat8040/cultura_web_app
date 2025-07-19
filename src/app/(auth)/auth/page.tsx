'use client'
import { useSearchParams } from "next/navigation";
import AuthPage from "./AuthPage";

const Auth = () => {
    const searchParams = useSearchParams()
    const authType = searchParams.get("authType")
    const fallback = searchParams.get("fallback")
    return (
        <AuthPage authType={authType} fallback={fallback} />
    )
}

export default Auth;