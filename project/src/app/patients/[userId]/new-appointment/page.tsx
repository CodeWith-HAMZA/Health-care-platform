import AppointmentForm from "@/components/forms/appointment";
import { getPatient, getUser } from "@/lib/actions/patient.actions";
import { Patient } from "@/models/patient.model";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({ params: { userId } }: SearchParamProps) {
  try {
    const patient: Patient = await getPatient(userId);
    console.log(patient, " patient");
    return (
      <div className="flex h-screen">
        <section className="container my-auto ">
          <div className="sub-container max-w-[800px] ">
            <Image
              alt="Logo"
              src={"/assets/icons/logo-full.svg"}
              width={100}
              height={100}
            />
            <AppointmentForm
              patientId={patient?.$id}
              type="create"
              userId={patient.userId}
            />
          </div>
        </section>
      </div>
    );
  } catch (e) {
    notFound();
  }
}
