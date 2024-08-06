"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";

import { createUser } from "@/lib/actions/patient.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { account, users } from "@/appwrite.config";
import { updateAppointment } from "@/lib/actions/appointment.actions";
import { CancelAppointmentSchema } from "@/validations";

export default function UpdateAppointment({
  appointmentId,
  type,
  userId,
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  appointmentId: string;
  type: "cancel" | "schedule";
  userId: string;
}) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof CancelAppointmentSchema>>({
    resolver: zodResolver(CancelAppointmentSchema),
    defaultValues: {
      cancellationReason: "",
    },
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof CancelAppointmentSchema>) {
    setLoading(true);
    try {
      const user = await updateAppointment({
        appointmentId,
        status: "cancelled",
        userId,
        reason: values.cancellationReason!,
      });

      console.log(user, "user ");
      if (user) {
        // localStorage.setItem("__u__", user?.$id);
        // localStorage.setItem("__t__", user?.$id);
        // router.push(`/patients/${user.$id}/register`);
        setOpen(false);

        toast.success("Successfully Cancelled The Appointment!");
      }
      setLoading(false);
    } catch (error) {
      toast.error("Error! while proceeding it");

      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
        <CustomFormField
          formFieldType={FormFieldType.TEXTAREA}
          control={form.control}
          label="Your Reason"
          name="cancellationReason"
          placeholder="Enter Your Reason For Cancelling"
        />

        <SubmitButton
          className="shad-danger-btn hover:opacity-90 text-white"
          isLoading={loading}
        >
          Cancel Appointment
        </SubmitButton>
      </form>
    </Form>
  );
}
