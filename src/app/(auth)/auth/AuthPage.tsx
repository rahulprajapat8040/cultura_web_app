import { FacebookIcon, GoogleIcon } from "@/components/icons/Icon";
import Image from "next/image";
import Link from "next/link";

const AuthPage = ({ authType }: { authType: string | null }) => {
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
                                <>
                                    <div className="grid grid-cols-1 space-y-2">
                                        <label htmlFor="fullName"
                                            className="font-medium"
                                        >
                                            E-mail Address
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter your e-mail."
                                            className="outline-none rounded-md border p-3 border-light-gray"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 space-y-2">
                                        <label htmlFor="fullName" className="font-medium">Password</label>
                                        <input
                                            type="text"
                                            placeholder="Enter password."
                                            className="outline-none rounded-md border p-3 border-light-gray"
                                        />
                                    </div>
                                    <div>
                                        <button className="text-center w-full bg-dark-blue-gray text-background py-4 rounded-md text-lg font-semibold mt-4">
                                            Login
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
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 space-y-2">
                                        <label htmlFor="fullName" className="font-medium">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your full name."
                                            className="outline-none rounded-md border p-3 border-light-gray"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 space-y-2">
                                        <label htmlFor="fullName"
                                            className="font-medium"
                                        >
                                            E-mail Address
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter your e-mail."
                                            className="outline-none rounded-md border p-3 border-light-gray"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 space-y-2">
                                        <label htmlFor="fullName" className="font-medium">Password</label>
                                        <input
                                            type="text"
                                            placeholder="Enter password."
                                            className="outline-none rounded-md border p-3 border-light-gray"
                                        />
                                    </div>
                                    <div>
                                        <button className="text-center w-full bg-dark-blue-gray text-background py-4 rounded-md text-lg font-semibold mt-4">
                                            Create Account
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <p>Already have an account?</p>
                                        <Link
                                            href={'/auth?authType=login'}
                                            className="text-dark-blue-gray font-medium"
                                        >
                                            Log In
                                        </Link>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AuthPage;