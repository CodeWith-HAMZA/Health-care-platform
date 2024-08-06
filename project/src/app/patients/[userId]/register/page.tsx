import Registeration from "@/components/forms/registeration";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

async function RegisterPage({ params: { userId } }: SearchParamProps) {
  try {
    const { $id, name, email, phone } = await getUser(userId);

    return (
      <>
        <div className="flex h-screen max-h-screen">
          {/* TODO! OTP verification | passkey */}
          <section className="container my-auto ">
            <div className="sub-container max-w-[800px] ">
              <Image
                alt="Logo"
                src={"/assets/icons/logo-full.svg"}
                width={100}
                height={100}
              />
              <Registeration
                user={{
                  name,
                  email,
                  phone,
                  $id,
                }}
              />
              {/* <PatientForm /> */}
            </div>
          </section>
          {/* <Image
            src={"/assets/images/register-img.png"}
            alt="patient"
            width={1000}
            height={1000}
            className="side-img"
          /> */}
        </div>
      </>
    );
  } catch (error) {
    notFound();
  }
}

export default RegisterPage;
