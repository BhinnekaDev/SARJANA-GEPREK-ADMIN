import React, { useState, useEffect } from "react";
import { Navbar, Button, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Napbar() {
  return (
    <Navbar className="max-w-screen-2xl bg-white shadow-md">
      <div className="flex justify-between text-blue-gray-900">
        <div className="items-center gap-x-2 lg:flex w-full">
          <div className="relative flex gap-2 md:w-max">
            <input type="search" placeholder="Silahkan Cari..." className="min-w-[288px] border border-gray-400 p-2 px-4 text-black placeholder-gray-500 rounded-full " />
            <div className="absolute right-3 top-[10px]">
              <MagnifyingGlassIcon className="h-5 w-5 text-black" strokeWidth={3} />
            </div>
          </div>

          <div className="w-full flex justify-between">
            <Menu>
              <MenuHandler>
                <Button size="sm" className="hidden items-center gap-2 lg:flex focus:ring-0 bg-orange-400">
                  <p className="text-white mx-auto">Hari Terakhir</p>
                  <ChevronDownIcon strokeWidth={2.5} className="h-3.5 w-3.5 transition-transform text-white " />
                </Button>
              </MenuHandler>
              <MenuList className="hidden max-h-72 w-52 lg:block">
                <MenuItem className="flex gap-2">7 Hari Terakhir </MenuItem>
                <MenuItem className="flex gap-2">14 Hari Terakhir </MenuItem>
                <MenuItem className="flex gap-2">30 Hari Terakhir </MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <MenuHandler>
                <Button size="sm" className="hidden items-center gap-2 lg:flex focus:ring-0 bg-orange-400 w-48 h-8 justify-center">
                  <p className="text-white mx-auto">Tambah Data</p>
                  <ChevronDownIcon strokeWidth={2.5} className="h-3.5 w-3.5 transition-transform text-white " />
                </Button>
              </MenuHandler>
              <MenuList className="hidden max-h-72 w-52 lg:block">
                <MenuItem className="flex items-center gap-2">Tambah Admin</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

export default Napbar;
