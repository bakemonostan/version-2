import React from "react";
import DashboardNavbar from "./dashboard/_components/DashboardNavbar";
import DashboardSidebar from "./dashboard/_components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" bg-black/10 h-screen" >
      <DashboardNavbar />
      <div className="flex flex-col sm:grid grid-cols-12 pb-12 sm:p-5 sm:gap-4 mx-auto lg:max-w-[90rem]">
        <aside className="sm:block sm:col-span-3 lg:col-span-2">
        <DashboardSidebar/>
        </aside>

        <main className="flex-grow col-span-9 lg:col-span-10 sm:rounded-xl">
          <section className="grid  grid-cols-12 gap-4 mx-auto">
            {children}
          </section>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 text-white sm:hidden">
          text
        </footer>
      </div>
    </div>
  );
}
