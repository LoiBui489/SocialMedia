'use client';

import { Connection, Field, FieldError, Input } from "@clerk/elements/common";
import { Action, Captcha, Root, Step, Strategy } from "@clerk/elements/sign-up";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
    return (
        <div className="w-full h-screen flex items-center justify-between p-8">
            <div className="hidden lg:flex w-1/2 items-center justify-center">
                <Image src={"/icons/logo.svg"} alt="logo" width={300} height={300} />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-4 items-center lg:items-start">
                <h1 className="text-2xl xsm:text-4xl md:text-6xl font-bold">Happening now</h1>
                <h1 className="text-2xl">Join Today</h1>
                <Root>
                    <Step name="start" className="flex flex-col gap-4">
                        <Connection name="google" className="bg-foreground text-background font-bold w-72 p-2 rounded-full flex justify-center items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="20" viewBox="0 0 20 20" width="20">
                                <g clipPath="url(#clip0_98_45)">
                                    <path d="M19.9905 10.1871C19.9905 9.36773 19.9224 8.7698 19.7752 8.14972H10.1992V11.848H15.8201C15.7068 12.7671 15.0948 14.1512 13.7349 15.0813L13.7159 15.2051L16.7436 17.497L16.9534 17.5174C18.8798 15.779 19.9905 13.2211 19.9905 10.1871Z" fill="#4285F4" />
                                    <path d="M10.1992 19.9313C12.953 19.9313 15.2648 19.0454 16.9534 17.5174L13.7349 15.0813C12.8737 15.6682 11.7177 16.0779 10.1992 16.0779C7.50211 16.0779 5.21297 14.3395 4.39695 11.9366L4.27734 11.9466L1.12906 14.3273L1.08789 14.4391C2.76508 17.6945 6.21016 19.9313 10.1992 19.9313Z" fill="#34A853" />
                                    <path d="M4.39695 11.9366C4.18164 11.3166 4.05703 10.6521 4.05703 9.96565C4.05703 9.27908 4.18164 8.61473 4.38562 7.99466L4.37992 7.8626L1.19219 5.44366L1.08789 5.49214C0.396641 6.84305 0 8.36008 0 9.96565C0 11.5712 0.396641 13.0882 1.08789 14.4391L4.39695 11.9366Z" fill="#FBBC05" />
                                    <path d="M10.1992 3.85336C12.1144 3.85336 13.4062 4.66168 14.1429 5.33718L17.0213 2.59107C15.2535 0.985496 12.953 0 10.1992 0C6.21016 0 2.76508 2.23672 1.08789 5.49214L4.38563 7.99466C5.21297 5.59183 7.50211 3.85336 10.1992 3.85336Z" fill="#EB4335" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_98_45">
                                        <rect fill="white" height="20" width="20" />
                                    </clipPath>
                                </defs>
                            </svg>
                            Sign In With Google
                        </Connection>
                        <Connection name="google" className="bg-foreground text-background font-bold w-72 p-2 rounded-full flex justify-center items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="20" viewBox="0 0 20 20" width="20">
                                <path d="M17.7635 6.81868C17.6475 6.90869 15.5993 8.06281 15.5993 10.6291C15.5993 13.5974 18.2056 14.6475 18.2836 14.6735C18.2716 14.7375 17.8695 16.1116 16.9094 17.5118C16.0533 18.7439 15.1593 19.974 13.7991 19.974C12.439 19.974 12.089 19.1839 10.5188 19.1839C8.98869 19.1839 8.44464 20 7.20052 20C5.95639 20 5.0883 18.8599 4.0902 17.4597C2.93409 15.8156 2 13.2613 2 10.8371C2 6.9487 4.52825 4.88649 7.0165 4.88649C8.33863 4.88649 9.44074 5.75458 10.2708 5.75458C11.0608 5.75458 12.293 4.83448 13.7971 4.83448C14.3672 4.83448 16.4154 4.88649 17.7635 6.81868ZM13.0831 3.18832C13.7051 2.45025 14.1452 1.42614 14.1452 0.40204C14.1452 0.260026 14.1332 0.116012 14.1072 0C13.0951 0.0380038 11.8909 0.674068 11.1649 1.51615C10.5948 2.16422 10.0628 3.18832 10.0628 4.22642C10.0628 4.38244 10.0888 4.53845 10.1009 4.58846C10.1648 4.60046 10.2688 4.61446 10.3728 4.61446C11.2809 4.61446 12.423 4.0064 13.0831 3.18832Z" fill="black" />
                            </svg>
                            Sign In With Apple
                        </Connection>
                        <div className="w-72 flex items-center gap-4">
                            <div className="flex-grow h-px border border-textGray"></div>
                            <div>Or</div>
                            <div className="flex-grow h-px border border-textGray"></div>
                        </div>
                        <Field name="username" className="flex flex-col gap-2">
                            <Input placeholder="Username" className="w-72 py-2 px-6 rounded-full text-background placeholder:text-sm" />
                            <FieldError className="text-red-600 text-sm" />
                        </Field>
                        <Field name="emailAddress" className="flex flex-col gap-2">
                            <Input placeholder="Email" className="w-72 py-2 px-6 rounded-full text-background placeholder:text-sm" />
                            <FieldError className="text-red-600 text-sm" />
                        </Field>
                        <Field name="password" className="flex flex-col gap-2">
                            <Input placeholder="Password" className="w-72 py-2 px-6 rounded-full text-background placeholder:text-sm" />
                            <FieldError className="text-red-600 text-sm" />
                        </Field>
                        <div>
                            <Captcha />
                            <Action submit className="w-72 text-center text-sm text-iconBlue underline">Sign Up</Action>
                        </div>
                    </Step>
                    <Step name="continue">
                        <Field name="username" className="flex flex-col gap-2">
                            <Input placeholder="Username" className="w-72 py-2 px-6 rounded-full text-background placeholder:text-sm" />
                            <FieldError className="text-red-600 text-sm" />
                        </Field>
                        <Action submit className="w-72 mt-4 text-center text-sm text-iconBlue underline">Continue</Action>
                    </Step>
                    <Step name="verifications">
                        <Strategy name="email_code">
                            <h1 className="text-sm mb-2">Check your E-Mail</h1>
                            <Field name="code" className="flex flex-col gap-4">
                                <Input placeholder="Verification Code" className="w-72 py-2 px-6 rounded-full text-background placeholder:text-sm" />
                                <FieldError className="text-red-600 text-sm" />
                            </Field>
                            <Action submit className="w-72 mt-4 text-center text-sm text-iconBlue underline">Verify</Action>
                        </Strategy>
                    </Step>
                    <div className="w-72 flex items-center gap-4">
                        <div className="flex-grow h-px border border-textGray"></div>
                        <div>Already have an account?</div>
                        <div className="flex-grow h-px border border-textGray"></div>
                    </div>
                    <Link href={"/sign-in"} className="w-72 p-2 text-foreground text-center font-bold bg-iconBlue rounded-full">Sign In Now</Link>
                    <p className="w-72 text-sm">
                        By signing in, you agree to our
                        <Link href={"/terms"} className="text-iconBlue"> Terms of Service</Link> and
                        <Link href={"/privacy"} className="text-iconBlue"> Privacy Policy</Link>
                    </p>
                </Root>
            </div>
        </div >
    );
};
