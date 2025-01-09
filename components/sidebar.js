"use client";
import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  HomeIcon,
  UserGroupIcon,
  UserCircleIcon,
  BuildingOffice2Icon,
  PresentationChartBarIcon,
  InformationCircleIcon,
  CircleStackIcon,
  ClockIcon,
  ChartBarSquareIcon,
  DocumentTextIcon,
  CreditCardIcon,
  DocumentPlusIcon,
  Cog6ToothIcon,
  PowerIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { IoPersonCircle } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";

const profilAdmin = require("@/assets/images/profil.jpg");
function Sidebar() {
  const [buka, setBuka] = useState(0);

  const tanganiBuka = (nilai) => {
    setBuka(buka === nilai ? 0 : nilai);
  };

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 flex flex-col">
      <div className="mb-4 p-2">
        <Typography variant="h4" color="blue-gray">
          SARJANA GEPREK
        </Typography>
      </div>
      <hr className="border border-gray-300 w-72 self-center" />

      {/* List Utama dengan justify-between */}
      <List className="flex flex-col justify-between flex-grow ">
        {/* Bagian Menu */}
        <div>
          <ListItem className="bg-orange-400 text-white">
            <ListItemPrefix>
              <HomeIcon className="h-5 w-5" />
            </ListItemPrefix>
            Beranda
          </ListItem>

          {/* Dropdown: Partisipan */}
          <Accordion open={buka === 1} className=" py-1 ">
            <ListItem className="p-0" onClick={() => tanganiBuka(1)}>
              <AccordionHeader className="p-3 border-none">
                <ListItemPrefix>
                  <UserGroupIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Partisipan
                </Typography>
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`ml-auto h-5 w-5 transition-transform ${
                    buka === 1 ? "rotate-180" : ""
                  }`}
                />
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem>
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Admin
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <UserIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Pengguna
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <BuildingOffice2Icon className="h-5 w-5" />
                  </ListItemPrefix>
                  Perusahaan
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>

          {/* Dropdown: Produk */}
          <Accordion open={buka === 2} className=" py-1">
            <ListItem className="p-0" onClick={() => tanganiBuka(2)}>
              <AccordionHeader className="p-3 border-none">
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Produk
                </Typography>
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`ml-auto h-5 w-5 transition-transform ${
                    buka === 2 ? "rotate-180" : ""
                  }`}
                />
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem>
                  <ListItemPrefix>
                    <InformationCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Informasi
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <CircleStackIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Jasa
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>

          {/* Dropdown: Aktivitas */}
          <Accordion open={buka === 3} className=" py-1">
            <ListItem className="p-0" onClick={() => tanganiBuka(3)}>
              <AccordionHeader className="p-3 border-none">
                <ListItemPrefix>
                  <ClockIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Aktivitas
                </Typography>
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`ml-auto h-5 w-5 transition-transform ${
                    buka === 3 ? "rotate-180" : ""
                  }`}
                />
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem>
                  <ListItemPrefix>
                    <ChartBarSquareIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  IKM
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <DocumentTextIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Pengajuan
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <CreditCardIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Pembayaran
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <DocumentPlusIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Pembuatan
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
        </div>

        {/* Bagian Pengaturan dan Profil */}
        <div>
          <div className="grid grid-cols-1">
            <div className="flex items-center gap-3 hover:bg-gray-200 px-2 py-4 rounded-lg transition ease-in-out duration-200 cursor-pointer">
              <IoPersonCircle className="h-6 w-6" />
              <Typography color="blue-gray" className="mr-auto font-normal">
                Profile Saya
              </Typography>
            </div>
            <div className="flex items-center gap-3 hover:bg-gray-200 px-2 py-4 rounded-lg transition ease-in-out duration-200 cursor-pointer">
              <IoMdLogOut className="h-6 w-6" />
              <Typography color="blue-gray" className="mr-auto font-normal">
                Keluar
              </Typography>
            </div>
          </div>
          <div className="border-t border-gray-400 mt-4" />
          {/* Profile Section */}
          <div className="mt-4 flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center w-full">
              <Image
                src={profilAdmin}
                width={40}
                height={40}
                alt="Profile Picture"
                className="rounded-full"
              />
              <div className="ml-4">
                <Typography className="font-semibold text-sm">
                  HengkiGanteng
                </Typography>
                <Typography className="text-xs text-gray-500">
                  HengkiGanteng@gmail.com
                </Typography>
              </div>
            </div>
          </div>
          <Typography className=" text-xs text-gray-400 mt-5 flex justify-center">
            @ 2025 Bhineka Developer.
          </Typography>
        </div>
      </List>
    </Card>
  );
}

export default Sidebar;
