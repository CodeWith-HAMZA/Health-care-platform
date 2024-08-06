"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// import { AppointmentForm } from "./forms/AppointmentForm";

// import "react-datepicker/dist/react-datepicker.css";
import { Appointment } from "@/models/appointment.model";
import UpdateAppointment from "./forms/appointment/UpdateAppointment";
import { updateAppointment } from "@/lib/actions/appointment.actions";
import { toast } from "sonner";

export const AppointmentModal = ({
  patientId,
  userId,
  appointment,
  type,
}: {
  patientId: string;
  userId: string;
  appointment?: Appointment;
  type: "schedule" | "cancel";
  title: string;
  description: string;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  async function handleScheduleAppointment() {
    try {
      setLoading(true);
      await updateAppointment({
        appointmentId: appointment?.$id!,
        userId,
        status: "scheduled",
      });
      setLoading(false);
      setOpen(false);
      toast.success("Successfully Scheduled The Appointment!");
    } catch (error) {
      setLoading(false);
      setOpen(false);
      toast.error("error while scheduling your appointment");
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize ${type === "schedule" && "text-green-500"}`}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
          <DialogDescription>
            Please fill in the following details to {type} appointment
          </DialogDescription>
        </DialogHeader>

        {type === "schedule" && (
          <div className="flex gap-3">
            <Button disabled={loading} onClick={handleScheduleAppointment}>
              Confirm
            </Button>
            <Button onClick={() => setOpen(false)} variant={"ghost"}>
              Close
            </Button>
          </div>
        )}

        {type === "cancel" && (
          <UpdateAppointment
            userId={userId}
            type={type}
            appointmentId={appointment?.$id || ""}
            setOpen={setOpen}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
