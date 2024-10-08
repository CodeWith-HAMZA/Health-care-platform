/* eslint-disable no-unused-vars */
// Create-Prefix means For Forms

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "Male" | "Female" | "Other";

// it doesn't have to be imported, it will be available globally without even importing
declare interface ExampleType {
  prop1: string;
  prop2: number;
}
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
  userId: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: File[] | undefined;
  privacyConsent: boolean;
}

declare type CreateAppointmentParams = {
  userId: string;
  patient: string;
  primaryPhysician?: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
  doctor?: string;
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  appointment?: Appointment;
  status: string;
  
};
