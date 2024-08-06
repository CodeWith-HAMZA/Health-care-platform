"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LS_userId, account } from "@/appwrite.config";
import { ID } from "node-appwrite";
import { redirect, usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import EmailOtp from "./EmailOtp";

export default function Page({ params, searchParams }: SearchParamProps) {
  const emailRef = useRef();
  const [loading, setloading] = useState(false);
  const [otp, setOtp] = useState("");
  const [count, setCount] = useState(0);
  const path = usePathname();

  const r = useRouter();

  async function handleEmailSend() {
    setloading(true);
    try {
      const res = await account.createEmailToken(
        ID.unique(),
        emailRef?.current?.value as string
      );
      localStorage.setItem(LS_userId, res.userId);
      setloading(false);
      toast.success("6-Digit Verification Code is Sent To Your Email");
      const query = new URLSearchParams({
        emailToken: res.$id, // token id
        __u__: res.userId, // main-user id
        c: res.$createdAt, // createdat
        u: res.expire, // expires in
      });
      console.log(res);
      r.replace(`/welcome/?${query}`);
    } catch (error) {
      toast.error(error?.message);
      setloading(false);
    }
  }
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col justify-between w-1/2 p-8 bg-black text-white">
        <div className="flex items-center space-x-2">
          {/* <LogInIcon className="w-6 h-6" /> */}
          <span className="text-xl font-semibold cursor-pointer hover:opacity-90">
            Health Care
          </span>
        </div>
        <Image
          width={80}
          unoptimized
          height={80}
          className="w-full h-full my-8 rounded-xl side-img"
          src={"/assets/images/onboarding-img.png"}
          alt="Image"
        />

        <blockquote className="text-lg italic">
          "This library has saved me countless hours of work and helped me
          deliver stunning designs to my clients faster than ever before."
        </blockquote>
      </div>
      <div className="flex flex-col items-center justify-center w-1/2 p-8 bg-black text-white">
        <div className="w-full max-w-sm h-screen space-y-6">
          <div className="flex justify-end mb-28">
            <a href="#" className="text-sm font-medium text-white">
              Login
            </a>
          </div>

          {!(searchParams?.__u__ || searchParams?.emailToken) ? (
            <>
              {" "}
              <h2 className="text-2xl font-bold text-center">
                Create an account
              </h2>
              <p className="text-center text-muted-foreground">
                Enter your email below to create your account
              </p>
              <Input
                type="email"
                placeholder="name@example.com"
                className="w-full"
                ref={emailRef}
              />
              <Button
                disabled={loading}
                className="w-full"
                onClick={handleEmailSend}
              >
                Sign Up with Email
              </Button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center">
                Verify Your Email
              </h2>
              <p className="text-center text-muted-foreground">
                Enter your OTP below to Verify your Email Adress
              </p>
              <div className="flex gap-2 flex-col items-center justify-center">
                <InputOTP
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  maxLength={6}
                >
                  <InputOTPGroup className="flex gap-2">
                    <InputOTPSlot
                      className="border border-neutral-600 size-12 text-lg"
                      index={0}
                    />
                    <InputOTPSlot
                      className="border border-neutral-600 size-12 text-lg"
                      index={1}
                    />
                    <InputOTPSlot
                      className="border border-neutral-600 size-12 text-lg"
                      index={2}
                    />
                    <InputOTPSlot
                      className="border border-neutral-600 size-12 text-lg"
                      index={3}
                    />
                    <InputOTPSlot
                      className="border border-neutral-600 size-12 text-lg"
                      index={4}
                    />
                    <InputOTPSlot
                      className="border border-neutral-600 size-12 text-lg"
                      index={5}
                    />
                  </InputOTPGroup>
                </InputOTP>
                <EmailOtp
                  futureTime={searchParams?.u}
                  currentTime={new Date().getTime()}
                />
              </div>
              <Button
                disabled={loading}
                className="w-full"
                onClick={handleEmailSend}
              >
                Enter And Verify
              </Button>{" "}
            </>
          )}

          {/* <div className="flex items-center justify-center space-x-2">
            <hr className="w-full border-t border-muted-foreground" />
            <span className="text-sm text-muted-foreground">OR CONTINUE WITH</span>
            <hr className="w-full border-t border-muted-foreground" />
            </div>
            <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
            <GitlabIcon className="w-5 h-5" />
            <span>GitHub</span>
          </Button> */}
          <p className="text-xs text-center text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function GitlabIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z" />
    </svg>
  );
}

function LogInIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  );
}
