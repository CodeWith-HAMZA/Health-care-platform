"use client";
import PatientForm from "@/components/forms/patient";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { setTheme } = useTheme();

  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO! OTP verification | passkey */}
      <section className="container my-auto ">
        <div className="sub-container max-w-[500px] ">
          <Image
            alt="Logo"
            src={"/assets/icons/logo-full.svg"}
            width={100}
            height={100}
          />
          <PatientForm />
          <div className="text-14-regular">
            <p className="justify-items-end text-dark-600 xl:text-left">
              2024 I-Health
            </p>
            <Link href={"/?admin=true"}>Admin </Link>
          </div>
        </div>
      </section>
      <Image
        src={"/assets/images/onboarding-img.png"}
        alt="patient"
        width={1000}
        height={1000}
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
