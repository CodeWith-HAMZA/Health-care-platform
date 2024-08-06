"use client";
import { SelectItem } from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { getAppointmentSchema } from "@/validations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Doctors } from "@/constants";
import Image from "next/image";
import { createAppointment } from "@/lib/actions/appointment.actions";

interface Props {
  userId: string;
  patientId: string;
  type: "create" | "schedule" | "cancel";
}
export default function AppointmentForm({ userId, patientId, type }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // * getting the validating-AppointmentFormType according to the given "Type"
  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      note: "",
      reason: "",
      schedule: new Date(),
      cancellationReason: "",
    },
  });
  let submitButtonLable = "Create Appointment";

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    console.log("first");
    setLoading(true);
    try {
      let status: Status;
      const { primaryPhysician, reason, schedule, cancellationReason, note } =
        values;

      switch (type) {
        case "schedule":
          status = "scheduled";
          break;
        case "cancel":
          status = "cancelled";
          break;
        default:
          status = "pending";
          break;
      }

      if (type === "create" && patientId) {
        const appointmentData: CreateAppointmentParams = {
          userId,
          patient: patientId,
          schedule: new Date(schedule),
          doctor: primaryPhysician,
          //  primaryPhysician,  // this attribute is not configured on appwrite due to appwrite issue
          status: status as Status,
          note,
          reason: reason!,
        };
        const newAppointment = await createAppointment(appointmentData);
        console.log(newAppointment, " shaddus");
        if (newAppointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
          );
        }
        toast.success("Your Appointment Request Successfully Created!");
      }
      setLoading(false);
    } catch (error) {
      toast.error("Error! while proceeding it");

      setLoading(false);
    }
  }

  return (
    <section className="mb-12 space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex-1"
        >
          <h1 className="header">Hey There!👋</h1>
          <p className="text-dark-700">
            Request A New Appointment With Your Preffered Doctor
          </p>
          <CustomFormField
            formFieldType={FormFieldType.SINGLE_SELECT_DROPDOWN}
            control={form.control}
            label="Primary Physician"
            name="primaryPhysician"
            placeholder="Choose your prefered doctor"
          >
            {Doctors.map(({ name, image }) => {
              return (
                <SelectItem value={name} className="py-2">
                  <div className="flex gap-2 items-center">
                    <Image src={image} width={30} height={30} alt="dr. image" />
                    <p>{name}</p>
                  </div>
                </SelectItem>
              );
            })}
          </CustomFormField>

          <div className="grid grid-cols-2 gap-3">
            <CustomFormField
              formFieldType={FormFieldType.TEXTAREA}
              control={form.control}
              label="Reason For Appointment"
              name="reason"
              placeholder="ex. Sick, or ill"
            />
            <CustomFormField
              formFieldType={FormFieldType.TEXTAREA}
              control={form.control}
              label="Additional Comments/Notes"
              name="note"
              placeholder="ex. Prefer Afternoon appointments, if possible kindly "
            />
          </div>
          <CustomFormField
            formFieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            label="Expected Appointment Date"
            name="schedule"
            placeholder=""
          />

          <SubmitButton isLoading={loading}>{submitButtonLable}</SubmitButton>
        </form>
      </Form>
    </section>
  );
}
