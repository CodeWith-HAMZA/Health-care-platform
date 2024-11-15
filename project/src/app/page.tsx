"use client";
import { account } from "@/appwrite.config";
import PasskeyModal from "@/components/PasskeyModal";
import PatientForm from "@/components/forms/patient";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { ID, OAuthProvider } from "node-appwrite";

export default function Home({ searchParams }: SearchParamProps) {
  const { setTheme } = useTheme();

  // rendering on search params change
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO! OTP verification | passkey */}
      {isAdmin && <PasskeyModal />}

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
            
            <div className="flex justify-start items-center text-xs">
              <span>Register As Admin ?</span>
              <Button variant={"link"}>
                <Link href={"/?admin=true"} className="text-xs">
                  Start Here{" "}
                </Link>
              </Button>
            </div>
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
