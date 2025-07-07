'use client'

import { apiRequest } from "@/utils/apiHelper";
import { useRef, useState } from "react";
import PhoneInput, { CountryData } from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'; // import default style
import '@/assets/styles/phone-input.css'; // 👈 create this to override styles
import '@/app/globals.css'; // if using tailwind and global styles
import toast from "react-hot-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Login = () => {
    const router = useRouter()
    const [data, setData] = useState({
        step: 1,
        phoneNo: '',
        otp: '',
        countryCode: ''
    });

    const sendOtp = async () => {
        try {
            const PATH = `${process.env.NEXT_PUBLIC_SEND_OTP}`;
            const res = await apiRequest('post', PATH, { phoneNo: data.phoneNo, countryCode: data.countryCode }); // react-phone-input gives value without `+`
            if (res.data.success) {
                setData({ ...data, step: 2 });
                toast.success(res.data.data.otp)
            }
        } catch (error) {
        }
    };

    const LoginApi = async () => {
        try {
            const PATH = `${process.env.NEXT_PUBLIC_LOGIN}`
            const res = await apiRequest('post', PATH, { phoneNo: data.phoneNo, countryCode: data.countryCode, otp: data.otp })
            if (res.data.success) {
                Cookies.set("accessToken", res.data.data.accessToken, { expires: 7 })
                router.push('/')
            }
        } catch (error) {

        }
    }

    return (
        <section className="w-full h-screen bg-gradient-to-br from-background-secondary to-background-secondary/60 flex items-center justify-center">
            <div className="max-w-sm w-full rounded-2xl bg-white/10 border border-white/30 backdrop-blur-xl shadow-2xl p-6">
                <h2 className="text-white text-2xl font-bold text-center mb-6">Login</h2>
                <form className="space-y-6">
                    {data.step === 1 && (
                        <>
                            <PhoneInput
                                country={'in'}
                                value={data.countryCode.replace('+', '') + data.phoneNo}
                                onChange={(value: string, country: CountryData) => {
                                    const localNumber = value.replace(country.dialCode, '');
                                    setData({
                                        ...data,
                                        phoneNo: localNumber,
                                        countryCode: `+${country.dialCode}`,
                                    });
                                }}
                                inputClass="!w-full !p-6 !rounded-md !bg-white/20 !text-white !border-white/30 !placeholder-white/70"
                                containerClass="!w-full"
                                dropdownClass="!bg-white text-black"
                                inputStyle={{
                                    width: '100%',
                                    background: 'rgba(255,255,255,0.1)',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    borderRadius: '0.375rem',
                                    padding: '1rem',
                                    color: 'white',
                                }}
                            />

                            <button
                                type="button"
                                onClick={sendOtp}
                                className="w-full bg-white/30 hover:bg-white/50 text-white font-semibold py-3 rounded-md transition-colors duration-300"
                            >
                                Send OTP
                            </button>
                        </>
                    )}

                    {data.step === 2 && (
                        <>
                            <div className="flex justify-center gap-2">
                                <InputOTP
                                    value={data.otp}
                                    onChange={(value) => setData({ ...data, otp: value })}
                                    maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                                    <InputOTPGroup className="gap-3">
                                        {[...Array(6)].map((_, index) => (
                                            <InputOTPSlot
                                                key={index}
                                                index={index}
                                                className="w-10 h-12 text-center text-white text-xl bg-white/20 border border-white/30 rounded-md outline-none focus:ring-2 focus:ring-white/40"
                                            />
                                        ))}
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        className="font-bold hover:scale-110"
                                    >
                                        Go Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={sendOtp}
                                        className="font-bold hover:scale-110 text-blue-500"
                                    >
                                        resend
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    onClick={LoginApi}
                                    className="w-full bg-white/30 hover:bg-white/50 text-white font-semibold py-3 rounded-md transition-colors duration-300"
                                >
                                    Verify OTP
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </section>
    );
};

export default Login;
