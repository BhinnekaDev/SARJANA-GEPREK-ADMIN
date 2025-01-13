"use client";
import React from "react";

// KOMPONEN KAMI
import Sidebar from "@/components/sidebar";
import Konten from "@/app/dataMinuman/components/konten";

const page = () => {
  return (
    <section className="p-4 flex h-screen bg-[#eff0f3]">
      <Sidebar />
      <div className="flex flex-col flex-1 gap-4 mx-3">
        <Konten />
      </div>
    </section>
  );
};

export default page;
