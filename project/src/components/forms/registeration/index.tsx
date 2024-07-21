"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { PatientFormValidation } from "@/validations";
import { createUser } from "@/lib/actions/patient.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SelectItem } from "@/components/ui/select";
import { IdentificationTypes } from "@/constants";
import {
  ArrowBigRight,
  ArrowRight,
  ArrowRightCircle,
  ArrowRightIcon,
} from "lucide-react";
import { PatientFormDefaultValues } from "@/constants/index";
import { parseStringify } from "@/lib/utils";
import {
  APPWRITE_PROJECT_ID,
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  databases,
  storage,
} from "@/appwrite.config";
import { ID } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

export default function PatientForm({ user }: { user: User }) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
    },
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    const patientData = {
      ...values,
      userId: user?.$id,
    };

    // converting to blob
    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });
      formData = new FormData();
      formData.append("fileName", values.identificationDocument[0].name);
      formData.append("blobFile", blobFile);
    }

    setLoading(true);
    try {
      const p = await registerPatient(
         ({
          address: patientData.address,
          allergies: patientData.allergies,
          birthDate: patientData.birthDate,
          currentMedication: patientData.currentMedication,
          email: patientData.email,
          emergencyContactName: patientData.emergencyContactName,
          emergencyContactNumber: patientData.emergencyContactNumber,
          familyMedicalHistory: patientData.familyMedicalHistory,
          gender: patientData.gender,
          identificationDocument: formData,
          identificationNumber: patientData.identificationNumber,
          identificationType: patientData.identificationType,
          insurancePolicyNumber: patientData.insurancePolicyNumber,
          insuranceProvider: patientData.insuranceProvider,
          name: patientData.name,
          occupation: patientData.occupation,
          pastMedicalHistory: patientData.pastMedicalHistory,
          phone: patientData.phone,
          privacyConsent: patientData.privacyConsent,
          userId: patientData.userId,
        })
      );
      console.log(p);

      toast.success("Successfully Regitered!");
      // if (user) router.push(`/patients/${user.$id}/register`);
      setLoading(false);
    } catch (error) {
      console.log(error, " error");
      toast.error("Error! while proceeding it");

      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome </h1>
          <p className="text-dark-700">Let us know more about yourself.</p>

          <div id="personalInfoPart" className="">
            <h2 className="font-bold text-2xl mb-3">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-3">
              <CustomFormField
                formFieldType={FormFieldType.INPUT}
                control={form.control}
                label="User Name"
                name="name"
                placeholder="Enter Your Name"
              />

              <CustomFormField
                formFieldType={FormFieldType.INPUT}
                control={form.control}
                label="Email"
                name="email"
                placeholder="h@gmail.com"
              />
              <CustomFormField
                formFieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                label="Phone"
                name="phone"
                placeholder="(555) 123-4567"
              />

              <CustomFormField
                formFieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                label="Your Birth Date"
                name="birthDate"
                placeholder="Your Date Of Birth"
              />
              <CustomFormField
                formFieldType={FormFieldType.SELECT}
                control={form.control}
                label="Gender"
                name="gender"
                placeholder=""
              />
              <CustomFormField
                formFieldType={FormFieldType.INPUT}
                control={form.control}
                label="Occuption"
                name="occupation"
                placeholder="Your Occupation"
              />
              <CustomFormField
                formFieldType={FormFieldType.TEXTAREA}
                control={form.control}
                label="Address"
                name="address"
                placeholder="Enter Your Address"
              />

              <CustomFormField
                formFieldType={FormFieldType.INPUT}
                control={form.control}
                label="Emergency Contact Name"
                name="emergencyContactName"
                placeholder="Your Emergency Contact Name"
              />
              <CustomFormField
                formFieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                label="Emergency Contact Number"
                name="emergencyContactNumber"
                placeholder="0333 2234344"
              />
            </div>
          </div>
          <div id="MedicalInforPart">
            <h2 className="font-bold text-2xl mb-3">Medical History </h2>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-3">
              <CustomFormField
                formFieldType={FormFieldType.INPUT}
                control={form.control}
                label="Insurance Provider"
                name="insuranceProvider"
                placeholder="Blue Cross Blue Sheild"
              />

              <CustomFormField
                formFieldType={FormFieldType.INPUT}
                control={form.control}
                label="Allergies (if any)"
                name="allergies"
                placeholder="flu, dark cough"
              />
              <CustomFormField
                formFieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                label="Insurance Policy Number"
                name="insurancePolicyNumber"
                placeholder="(555) 123-4567"
              />

              <CustomFormField
                formFieldType={FormFieldType.TEXTAREA}
                control={form.control}
                label="Current Medication (if any)"
                name="currentMedication"
                placeholder="S-gliptin-50/500 mg, Nebicare 5mg"
              />
              <CustomFormField
                formFieldType={FormFieldType.TEXTAREA}
                control={form.control}
                label="Past Medical History"
                name="pastMedicalHistory"
                placeholder="Appendectomy, Tonsillectomy"
              />
              <CustomFormField
                formFieldType={FormFieldType.TEXTAREA}
                control={form.control}
                label="Family Medical History"
                name="familyMedicalHistory"
                placeholder="Appendectomy, Tonsillectomy"
              />
            </div>
          </div>

          <div id="IdentificationVerify">
            <h2 className="font-bold text-2xl mb-3">
              Identification And Verification{" "}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-3">
              <CustomFormField
                formFieldType={FormFieldType.SINGLE_SELECT_DROPDOWN}
                control={form.control}
                label="Identification Type"
                name="identificationType"
                placeholder=" Select Identification Type"
              >
                <SelectItem value="none">None</SelectItem>
                {IdentificationTypes.map((_) => {
                  return (
                    <>
                      <SelectItem value={_}>{_}</SelectItem>
                    </>
                  );
                })}
              </CustomFormField>
              <CustomFormField
                formFieldType={FormFieldType.INPUT}
                control={form.control}
                label="Identification Number"
                name="identificationNumber"
                placeholder="XXXX-XXXXXXXX-X"
              />
              <CustomFormField
                formFieldType={FormFieldType.FILE_INPUT}
                control={form.control}
                label="Identification Document"
                name="identificationDocument"
                placeholder="Upload Document Here"
              />
            </div>
          </div>

          <div id="IdentificationVerify" className="py-5">
            <h2 className="font-bold text-2xl mb-3">Privacy And Consent </h2>
            <div className="grid grid-cols-1  gap-3">
              <CustomFormField
                formFieldType={FormFieldType.CHECKBOX}
                control={form.control}
                label="I Consent Treatement"
                name="treatmentConsent"
                placeholder="You agree to our Terms of Service and Treatement."
              />
              <CustomFormField
                formFieldType={FormFieldType.CHECKBOX}
                control={form.control}
                label="I Consent To Disclosure of Information"
                name="disclosureConsent"
                placeholder="You agree to our Terms of Service and Disclosure."
              />
              <CustomFormField
                formFieldType={FormFieldType.CHECKBOX}
                control={form.control}
                label="I Consent To Privacy Policy"
                placeholder="You agree to our Terms of Service and Privacy Policy."
                name="privacyConsent"
              />
            </div>
          </div>
          <SubmitButton isLoading={loading}>Register </SubmitButton>
        </section>
      </form>
    </Form>
  );
}

// REGISTER PATIENT
export async function registerPatient({
  identificationDocument,
  ...patient
}: RegisterUserParams) {
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file;
    if (identificationDocument) {
      // const inputFile =
      //   identificationDocument &&
      //   InputFile.fromBuffer(
      //     identificationDocument?.get("blobFile") as Blob,
      //     identificationDocument?.get("fileName") as string
      //   );
      // file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: "file?.$id" ? "file.$" : null,
        identificationDocumentUrl: "https://shaddu.com",
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
}
