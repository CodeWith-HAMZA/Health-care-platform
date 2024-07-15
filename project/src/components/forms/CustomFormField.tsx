import React, { useState } from "react";
import "react-phone-number-input/style.css";

import { Controller, Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-number-input";
import {
  APPOINTMENT_COLLECTION_ID,
  APPWRITE_API_KEY,
  APPWRITE_PROJECT_ID,
  DATABASE_ID,
  DOCTOR_COLLECTION_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
} from "@/appwrite.config";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

interface CustomFormFieldProps {
  formFieldType: FormFieldType;
  control: Control<any>; // You can replace 'any' with the appropriate type of your form data
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  iconAlt?: string;
  iconSrc?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: string;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

function RenderInput({
  placeholder,
  field,
  label,
  iconAlt,
  iconSrc,
  formFieldType,
}: {
  placeholder: string;
  label: string;
  field: any;
  iconSrc: string;
  iconAlt: string;
  formFieldType: string;
}) {
  const [value, setValue] = useState();

  switch (formFieldType) {
    case FormFieldType.INPUT:
      return (
        <>
          <FormLabel>{label}</FormLabel>
          <Input placeholder={placeholder} {...field} />
        </>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <>
          <FormLabel>{label}</FormLabel>

          <PhoneInput
            international
            value={field?.value as string | undefined}
            onChange={field?.onChange}
            className="input-phone"
            defaultCountry="PK"
          />
        </>
      );
    default:
      break;
  }
}

const CustomFormField: React.FC<CustomFormFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  description,
  formFieldType,
  iconAlt,
  iconSrc,
}) => {
  // console.log(
  //   APPWRITE_PROJECT_ID,
  //   APPWRITE_API_KEY,
  //   DATABASE_ID,
  //   PATIENT_COLLECTION_ID,
  //   DOCTOR_COLLECTION_ID,
  //   APPOINTMENT_COLLECTION_ID,
  //   ENDPOINT
  // );
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RenderInput
              label={label}
              field={field}
              placeholder={placeholder || ""}
              iconAlt={iconAlt || ""}
              iconSrc={iconSrc || ""}
              formFieldType={formFieldType}
            />
          </FormControl>
          {/* <FormDescription>{description}</FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
