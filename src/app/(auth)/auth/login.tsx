import { apiRequest } from "@/utils/apiHelper";
import Link from "next/link";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface LoginProp {
    fallback: string | null
}

const Login = ({ fallback }: LoginProp) => {
    const router = useRouter()
    const [state, setState] = useState({
        email: '',
        password: '',
    })
    const [loading, setLoading] = useState(false)

    const handleSetState = (key: string, value: string) => {
        setState((prev) => ({ ...prev, [key]: value }))
    }

    const handleVerifyOtp = async () => {
        try {
            setLoading(true)
            const res = await apiRequest('post', `${process.env.NEXT_PUBLIC_LOGIN}`, {
                ...state,
                deviceId: 'test-device-id',
                deviceToken: 'test-device-token---####'
            })
            if (res.data.success) {
                Cookies.set("accessToken", res.data.data.accessToken)
                router.push(`${fallback ? `${fallback}` : '/'}`)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 space-y-2">
                <label htmlFor="fullName"
                    className="font-medium"
                >
                    E-mail Address
                </label>
                <input
                    type="text"
                    onChange={(e) => handleSetState("email", e.target.value)}
                    placeholder="Enter your e-mail."
                    className="outline-none rounded-md border p-3 border-light-gray"
                />
            </div>
            <div className="grid grid-cols-1 space-y-2">
                <label htmlFor="fullName" className="font-medium">Password</label>
                <input
                    type="password"
                    onChange={(e) => handleSetState("password", e.target.value)}
                    placeholder="Enter password."
                    className="outline-none rounded-md border p-3 border-light-gray"
                />
            </div>
            <div>
                <button
                    onClick={handleVerifyOtp}
                    disabled={loading}
                    className="mt-6 w-full bg-dark-blue-gray text-background py-3 rounded-md font-semibold text-lg"
                >
                    {loading ? 'Verifying...' : 'Login'}
                </button>
            </div>
            <div className="flex items-center gap-3">
                <p>Don’t have an account?</p>
                <Link
                    href={'/auth'}
                    className="text-dark-blue-gray font-medium"
                >
                    Signup
                </Link>
            </div>
        </>
    )
}

export default Login;