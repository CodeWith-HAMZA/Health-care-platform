"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { UserFormValidation } from "@/validations";
import { createUser } from "@/lib/actions/patient.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function PatientForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof UserFormValidation>) {
    const { email, phone, name } = values;
    console.log("first");
    setLoading(true);
    try {
      const user = await createUser({ name, email, phone });

      if (user) router.push(`/patients/${user.$id}/register`);
      toast.success("Success!");
      setLoading(false);
    } catch (error) {
      toast.error("Error! while proceeding it");

      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome Here!</h1>
          <p className="text-dark-700">Schedule Your First Appointment</p>
        </section>
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

        <SubmitButton isLoading={loading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
}
