"use client";
import { Sidebar } from "@/components/sidebar";
import Konten from "@/app/beranda/components/kontens";

function Page() {
  return (
    <div className="flex">
      <Sidebar />
      <Konten />
    </div>
  );
}

export default Page;
