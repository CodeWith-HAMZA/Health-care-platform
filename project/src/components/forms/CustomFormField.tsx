import React, { ReactNode, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MultiSelect } from "react-multi-select-component";

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];

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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { formatDate } from "date-fns";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import FileInputUploader from "./FileInputUploader";
import { Checkbox } from "../ui/checkbox";

export enum FormFieldType {
  INPUT = "input",
  PASSWORD_INPUT = "password",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  SINGLE_SELECT_DROPDOWN = "single-select-dropdown",
  MULTI_SELECT = "multi-select",

  FILE_INPUT = "file-input",
}

interface CustomFormFieldProps {
  formFieldType: FormFieldType;
  control: Control<any>; // You can replace 'any' with the appropriate type of your form data
  name: string;
  label: string;
  placeholder?: string;
  contentEditable?: boolean;
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
  children,
  contentEditable,
}: {
  children?: ReactNode;
  placeholder: string;
  label: string;
  field: any;
  iconSrc: string;
  iconAlt: string;
  formFieldType: string;
  contentEditable?: boolean;
}) {
  const [value, setValue] = useState([]);

  let isEditable;

  switch (formFieldType) {
    case FormFieldType.INPUT:
      if (contentEditable === undefined || contentEditable === true) {
        isEditable = true;
      } else if (contentEditable === false) {
        isEditable = false;
      }
      return (
        <>
          <FormLabel>{label}</FormLabel>
          <Input
            contentEditable={isEditable}
            value={field.value}
            placeholder={placeholder}
            {...(isEditable ? field : undefined)}
          />
        </>
      );
    case FormFieldType.PASSWORD_INPUT:
      if (contentEditable === undefined || contentEditable === true) {
        isEditable = true;
      } else if (contentEditable === false) {
        isEditable = false;
      }
      return (
        <>
          <FormLabel>{label}</FormLabel>
          <Input
            type="password"
            contentEditable={isEditable}
            value={field.value}
            placeholder={placeholder}
            {...(isEditable ? field : undefined)}
          />
        </>
      );
    case FormFieldType.FILE_INPUT:
      return (
        <>
          <FormLabel>{label}</FormLabel>
          <FileInputUploader files={field.value} onChange={field?.onChange} />
        </>
      );
    case FormFieldType.CHECKBOX:
      return (
        <div className="items-top flex space-x-2">
          <Checkbox
            checked={field?.value}
            onCheckedChange={field?.onChange}
            //  onChange={field?.onChange}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
            {placeholder ? (
              <p className="text-sm text-muted-foreground">{placeholder}</p>
            ) : null}
          </div>
        </div>
      );

    case FormFieldType.SINGLE_SELECT_DROPDOWN:
      return (
        <>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field?.onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{label}</SelectLabel>
                {children}
              </SelectGroup>
            </SelectContent>
          </Select>{" "}
        </>
      );
    case FormFieldType.PHONE_INPUT:
      if (contentEditable === undefined || contentEditable === true) {
        isEditable = true;
      } else if (contentEditable === false) {
        isEditable = false;
      }
      return (
        <>
          <FormLabel>{label}</FormLabel>

          <PhoneInput
            disabled={!isEditable}
            international
            value={field?.value as string | undefined}
            onChange={field?.onChange}
            className="input-phone"
            defaultCountry="PK"
          />
        </>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !field?.value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field?.value ? (
                  formatDate(field?.value, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field?.value}
                onSelect={field?.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </>
      );
    case FormFieldType.MULTI_SELECT:
      return (
        <>
          <FormLabel>{label}</FormLabel>
        </>
      );
    case FormFieldType.SELECT:
      return (
        <>
          <FormLabel>{label}</FormLabel>

          <RadioGroup
            onValueChange={field?.onChange}
            defaultValue={field.value}
            className="flex gap-2 py-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Male" id="r1" />
              <Label htmlFor="r1">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Female" id="r2" />
              <Label htmlFor="r2">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Other" id="r3" />
              <Label htmlFor="r3">Other</Label>
            </div>
          </RadioGroup>
        </>
      );
    case FormFieldType.TEXTAREA:
      return (
        <>
          {" "}
          <FormLabel>{label}</FormLabel>
          <Textarea placeholder={placeholder} {...field} />
        </>
      );
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
  children,
  contentEditable,
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
              children={children}
              contentEditable={contentEditable}
            />
          </FormControl>
          {/* <FormDescription>{description}</FormDescription> */}
          <FormMessage style={{ color: "#a42c2c" }} />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
