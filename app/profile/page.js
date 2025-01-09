"use client";
import React from "react";
import Profil from "@/app/profile/components/konten";
import Sidebar from "@/components/sidebar";

const Page = () => {
  return (
    <div className="flex px-4 py-4 bg-gray-100">
      {/* Sidebar */}
      <div className="w-[300px] bg-gray-100 border-r border-gray-200">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100 px-2">
        <Profil />
      </div>
    </div>
  );
};

export default Page;
