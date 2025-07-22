'use client'

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from '@/components/ui/input-otp'
import { apiRequest } from '@/utils/apiHelper'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Cookies from 'js-cookie'

interface SignupProp {
    fallback: string | null
}

const Signup = ({ fallback }: SignupProp) => {
    const router = useRouter()
    const [step, setSteps] = useState(1)
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        otp: '',
    })
    const [loading, setLoading] = useState(false)

    const handleSetState = (key: string, value: string) => {
        setState((prev) => ({ ...prev, [key]: value }))
    }

    const sendOtp = async () => {
        try {
            setLoading(true)
            const URL = `${process.env.NEXT_PUBLIC_SEND_OTP}`
            const res = await apiRequest('post', URL, { email: state.email })
            if (res.data.success) {
                handleSetState("otp", res.data.data.otp)
                setSteps(2)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOtp = async () => {
        try {
            setLoading(true)
            const res = await apiRequest('post', `${process.env.NEXT_PUBLIC_SIGNUP}`, {
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
            {step === 1 ? (
                <>
                    <div className="grid grid-cols-1 space-y-2">
                        <label htmlFor="fullName" className="font-medium">
                            Full Name
                        </label>
                        <input
                            type="text"
                            onChange={(e) => handleSetState('name', e.target.value)}
                            required
                            placeholder="Enter your full name."
                            className="outline-none rounded-md border p-3 border-light-gray"
                        />
                    </div>
                    <div className="grid grid-cols-1 space-y-2">
                        <label htmlFor="email" className="font-medium">
                            E-mail Address
                        </label>
                        <input
                            type="email"
                            onChange={(e) => handleSetState('email', e.target.value)}
                            required
                            placeholder="Enter your e-mail."
                            className="outline-none rounded-md border p-3 border-light-gray"
                        />
                    </div>
                    <div className="grid grid-cols-1 space-y-2">
                        <label htmlFor="password" className="font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            onChange={(e) => handleSetState('password', e.target.value)}
                            required
                            placeholder="Enter password."
                            className="outline-none rounded-md border p-3 border-light-gray"
                        />
                    </div>
                    <div>
                        <button
                            onClick={sendOtp}
                            disabled={loading}
                            className="text-center w-full bg-dark-blue-gray text-background py-4 rounded-md text-lg font-semibold mt-4"
                        >
                            {loading ? 'Sending OTP...' : 'Send OTP'}
                        </button>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                        <p>Already have an account?</p>
                        <Link
                            href={`/auth?authType=login&fallback=${fallback ? fallback : ''}`}
                            className="text-dark-blue-gray font-medium"
                        >
                            Log In
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex flex-col justify-center h-[300px] items-center gap-4">
                        <p className="text-lg font-medium">Enter the 6-digit OTP sent to your email</p>

                        <InputOTP
                            value={state.otp}
                            onChange={(value) => handleSetState('otp', value)}
                            maxLength={6}
                        >
                            <div className="flex items-center gap-3">
                                <InputOTPGroup className="flex gap-3">
                                    {[0, 1, 2].map((index) => (
                                        <InputOTPSlot
                                            key={index}
                                            index={index}
                                            className="w-14 h-14 text-2xl text-center border border-dark-blue-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ))}
                                </InputOTPGroup>

                                <InputOTPSeparator className="mx-2 text-2xl font-semibold text-gray-400" />

                                <InputOTPGroup className="flex gap-3">
                                    {[3, 4, 5].map((index) => (
                                        <InputOTPSlot
                                            key={index}
                                            index={index}
                                            className="w-14 h-14 text-2xl text-center border border-dark-blue-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ))}
                                </InputOTPGroup>
                            </div>
                        </InputOTP>

                        <button
                            onClick={handleVerifyOtp}
                            disabled={loading || state.otp.length < 6}
                            className="mt-6 w-full bg-dark-blue-gray text-background py-3 rounded-md font-semibold text-lg"
                        >
                            {loading ? 'Verifying...' : 'Verify OTP & Signup'}
                        </button>

                    </div>
                </>
            )}
        </>
    )
}

export default Signup
