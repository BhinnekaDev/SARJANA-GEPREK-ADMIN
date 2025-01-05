"use client";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import Konten from "@/app/dataAdmin/components/konten";

const Page = () => {
  return (
    <div className="flex px-4 py-4 bg-gray-100">
      <div className="w-[300px] bg-gray-100 border-r border-gray-200">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1">
        <div className=" flex px-2 bg-gray-100">
          <Navbar className="ml-[300px] px-8 py-4" />
        </div>

        {/* Konten utama */}
        <div className="flex-1 bg-gray-100 px-2 py-2">
          <Konten />
        </div>
      </div>
    </div>
  );
};

export default Page;
