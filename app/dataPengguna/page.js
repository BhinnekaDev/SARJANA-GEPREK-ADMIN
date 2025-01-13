"use client";
import Sidebar from "@/components/sidebar";
import Konten from "@/app/dataPengguna/components/konten";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  return (
    <div className="flex px-4 py-4 bg-gray-100">
      <ToastContainer />
      <div className="w-[300px] bg-gray-100 border-r border-gray-200">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1">
        {/* Konten utama */}
        <div className="flex-1 bg-gray-100 px-2 py-2">
          <Konten />
        </div>
      </div>
    </div>
  );
};

export default Page;
