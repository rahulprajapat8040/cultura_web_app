import { FacebookIcon, GoogleIcon } from "@/components/icons/Icon";
import Image from "next/image";
import Login from "./login";
import Signup from "./signup";

interface AuthPageProps {
    authType: string | null
    fallback: string | null
}

const AuthPage = ({ authType, fallback }: AuthPageProps) => {
    const isLogin = authType === 'login'
    return (
        <section className="w-full h-screen bg-dark-blue-gray text-background">
            <div className="flex h-full">
                <div className="py-3 space-y-6 w-full px-4">
                    <div>
                        <Image
                            src={'/assets/Logo.svg'}
                            alt="Logo"
                            width={150}
                            height={100}
                        />
                    </div>
                    <div className="flex justify-center">
                        <h1 className="text-5xl pt-5 font-semibold leading-16">
                            Discover tailored <br /> events. <br />
                            Sign up for personalized <br /> recommendations <br /> today!
                        </h1>
                    </div>
                </div>
                <div className="bg-background text-foreground w-full h-full rounded-l-4xl px-12 py-8">
                    <div>
                        <h2 className="text-dark-blue-gray text-3xl font-semibold">Create Account</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4 justify-between my-3 py-3">
                        <div
                            className="text-dark-blue-gray flex items-center justify-center gap-3 text-lg border py-2.5 rounded-xl border-light-gray"
                        >
                            <GoogleIcon />
                            {isLogin ? "Login with Google" : "Sign up with Google"}
                        </div>
                        <div
                            className="text-dark-blue-gray flex items-center justify-center gap-3 text-lg border py-2.5 rounded-xl border-light-gray"                            >
                            <FacebookIcon />
                            {isLogin ? "Login with Facebook" : "Sign up with Facebook"}
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-light-gray">
                        <div
                            className="w-full h-px  bg-gray-300"
                        />
                        <span>OR</span>
                        <div
                            className="w-full h-px  bg-gray-300"
                        />
                    </div>
                    <div className="text-light-gray space-y-6">
                        {
                            isLogin ? (
                                <Login fallback={fallback} />
                            ) : (
                                <Signup fallback={fallback} />
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AuthPage;