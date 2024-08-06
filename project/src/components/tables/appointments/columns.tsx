"use client";

import { ColumnDef, getPaginationRowModel } from "@tanstack/react-table";
import { Appointment } from "@/models/appointment.model";
export const columns: ColumnDef<Appointment>[] = [];
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDateTime } from "@/lib/utils";
import { formatDate } from "date-fns";
import StatusBadge from "@/components/StatusBadge";
import { Doctors } from "@/constants";
import Image from "next/image";
import { AppointmentModal } from "@/components/AppointmentModal";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const payments = [
  { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  { id: "7228ed52f", amount: 100, status: "pending", email: "m@example.com" },
  {
    id: "489e1d422",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  { id: "72228ed52f", amount: 100, status: "pending", email: "m@example.com" },
  {
    id: "489e1d4222",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "6de2d1a1",
    amount: 200,
    status: "completed",
    email: "test@example.com",
  },
  { id: "c8f9a2b0", amount: 75, status: "pending", email: "m@example.com" },
  {
    id: "f2a7e9c1",
    amount: 150,
    status: "processing",
    email: "test@example.com",
  },
  {
    id: "9b3c4a5d",
    amount: 180,
    status: "completed",
    email: "example@gmail.com",
  },
  { id: "1d8e2c6f", amount: 90, status: "pending", email: "test@example.com" },
  {
    id: "7a4b5d3c",
    amount: 110,
    status: "completed",
    email: "example@gmail.com",
  },
  { id: "4e5f6a2b", amount: 95, status: "pending", email: "m@example.com" },
  {
    id: "3c2d1a9b",
    amount: 135,
    status: "processing",
    email: "test@example.com",
  },
  {
    id: "5f7e8d2c",
    amount: 120,
    status: "completed",
    email: "example@gmail.com",
  },
  { id: "8a1b9c3d", amount: 80, status: "pending", email: "m@example.com" },
  {
    id: "2b4c3e5f",
    amount: 140,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "c9a8b7d6",
    amount: 160,
    status: "completed",
    email: "test@example.com",
  },
  { id: "d4e5f6a2", amount: 70, status: "pending", email: "m@example.com" },
  {
    id: "b3c2d1a9",
    amount: 170,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "6a7b8c9d",
    amount: 105,
    status: "completed",
    email: "test@example.com",
  },
  {
    id: "9e1b3c5d",
    amount: 130,
    status: "pending",
    email: "example@gmail.com",
  },
  { id: "2f4a6b8c", amount: 145, status: "processing", email: "m@example.com" },
];

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const paymentsColumns: ColumnDef<Payment>[] = [
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const payment = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(payment.id)}
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
  {
    accessorKey: "id",
    header: "Serial No.",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "pkr",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export const appointmentColumns: ColumnDef<Appointment>[] = [
  {
    header: "S/no",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p className="text-14-medium">{appointment.patient.name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={row.original.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "note",
    header: "Note",
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      return (
        <div className="text-14-medium">
          {formatDateTime(row.original.schedule).dateTime}
        </div>
      );
    },
  },
  {
    accessorKey: "doctor",
    header: "Primary Physician",
    cell: ({ row }) => {
      const doctor = Doctors.find((_) => _.name === row.original.doctor);
      return (
        <div className="flex text-14-medium gap-2">
          <Image alt="img" src={doctor?.image} width={20} height={20} />
          <span> {doctor ? "Dr. " + doctor?.name : ""}</span>
        </div>
      );
    },
  },

  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const appointment = row.original;
      // if (
      //   appointment.status === "cancelled" ||
      //   appointment.status === "scheduled"
      // ) {
      //   return <p>No Actions Are Available</p>;
      // }
      return (
        <div className="flex gap-1">
          <AppointmentModal
            patientId={appointment.patient.$id}
            userId={appointment.userId}
            appointment={appointment}
            type="schedule"
            title="Schedule Appointment"
            description="Please confirm the following details to schedule."
          />
          <AppointmentModal
            patientId={appointment.patient.$id}
            userId={appointment.userId}
            appointment={appointment}
            type="cancel"
            title="Cancel Appointment"
            description="Are you sure you want to cancel your appointment?"
          />
        </div>
      );
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const payment = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(payment.id)}
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "id",
  //   header: "Serial No.",
  // },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  // },
  // {
  //   accessorKey: "email",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Email
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"));
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "pkr",
  //     }).format(amount);

  //     return <div className="text-right font-medium">{formatted}</div>;
  //   },
  // },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const payment = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(payment.id)}
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
