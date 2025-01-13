"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// KOMPONEN KAMI
import Sidebar from "@/components/sidebar";
import Konten from "@/app/beranda/components/konten";

// import Konten from "@/app/beranda/components/konten";

const Beranda = () => {
  const pengarah = useRouter();
  const [tahunDipilih, setTahunDipilih] = useState("Pilih Tahun");

  return (
    <section className="p-4 flex h-screen bg-[#eff0f3]">
      <ToastContainer />
      <Sidebar pengarah={pengarah} />
      <div className="flex flex-col flex-1 gap-4 mx-3">
        <Konten tahunDipilih={tahunDipilih} />
      </div>
    </section>
  );
};

export default Beranda;
