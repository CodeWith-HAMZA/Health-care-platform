import StatCard from "@/components/cards/StatCard";
import { DataTable } from "@/components/tables/appointments/DataTable";
import {
  appointmentColumns,
  columns,
  payments,
  paymentsColumns,
} from "@/components/tables/appointments/columns";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "react-day-picker";
import AdminProfile from "./AdminProfile";

async function AdminPage() {
  const appointments = await getRecentAppointmentList();
  console.log(appointments);
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src={"/assets/icons/logo-full.svg"}
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <AdminProfile />
       </header>
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">
            Start The Day With Managing New Appointments
          </p>
        </section>
        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            // count={3}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            // count={33}
            count={appointments.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            // count={3}
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>
        <DataTable columns={appointmentColumns} data={appointments.documents} />
        {/* <DataTable columns={paymentsColumns} data={payments} /> */}
      </main>
    </div>
  );
}

export default AdminPage;
