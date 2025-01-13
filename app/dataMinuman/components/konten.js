"use client";
import React, { useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import ModalTambahMenuMinuman from "@/components/modalTambahMenuMinuman";
import Image from "next/image";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const fotoMinuman = require("@/assets/images/LogoAyam.png");
const menuAwalMinuman = [
  {
    name: "Es Teh Manis",
    category: "Minuman Dingin",
    price: "Rp 8.000",
    description: "Es teh manis segar",
    image: fotoMinuman,
    rating: 5,
  },
  {
    name: "Es Jeruk",
    category: "Minuman Dingin",
    price: "Rp 10.000",
    description: "Es jeruk segar dari buah asli",
    image: fotoMinuman,
    rating: 4,
  },
  {
    name: "Kopi Susu",
    category: "Minuman Panas",
    price: "Rp 15.000",
    description: "Kopi susu dengan campuran gula aren",
    image: fotoMinuman,
    rating: 5,
  },
  {
    name: "Air Mineral",
    category: "Minuman Lainnya",
    price: "Rp 5.000",
    description: "Air mineral dalam kemasan botol",
    image: fotoMinuman,
    rating: 5,
  },
];

const Konten = () => {
  const [menuMinuman, setMenuMinuman] = useState(menuAwalMinuman);
  const [kategoriDipilih, setKategoriDipilih] = useState("Semua Kategori");
  const [menuBaru, setMenuBaru] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });
  const [modalTerbuka, setModalTerbuka] = useState(false);

  const bukaModal = () => setModalTerbuka(true);
  const tutupModal = () => setModalTerbuka(false);

  const ubahInputMenu = (e) => {
    const { name, value } = e.target;
    setMenuBaru((prev) => ({ ...prev, [name]: value }));
  };

  const tambahMenu = () => {
    setMenuMinuman((prev) => [
      ...prev,
      {
        ...menuBaru,
        rating: 0,
      },
    ]);
    setMenuBaru({
      name: "",
      category: "",
      price: "",
      description: "",
      image: "",
    });
    tutupModal();
  };

  const hapusMenu = (index) => {
    setMenuMinuman((prev) => prev.filter((_, i) => i !== index));
  };

  const suntingMenu = (index) => {
    const item = menuMinuman[index];
    setMenuBaru(item); // Set nilai menu untuk diedit
    bukaModal(); // Buka modal untuk pengeditan
  };

  const menuDifilter =
    kategoriDipilih === "Semua Kategori"
      ? menuMinuman
      : menuMinuman.filter((item) => item.category === kategoriDipilih);

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h3" className="text-orange-600 font-extrabold">
            Menu Minuman
          </Typography>
          <Button
            onClick={bukaModal}
            className="bg-orange-500 hover:bg-orange-700 shadow-lg"
          >
            Tambah Menu
          </Button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Pilih minuman favorit Anda dari daftar di bawah ini.
        </p>
        <select
          value={kategoriDipilih}
          onChange={(e) => setKategoriDipilih(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="Semua Kategori">Semua Kategori</option>
          <option value="Minuman Dingin">Minuman Dingin</option>
          <option value="Minuman Panas">Minuman Panas</option>
          <option value="Minuman Lainnya">Minuman Lainnya</option>
        </select>
      </Card>

      {/* Modal untuk menambahkan menu baru */}
      <ModalTambahMenuMinuman
        terbuka={modalTerbuka}
        ubahStatusModal={tutupModal}
        menuBaru={menuBaru}
        ubahInputMenu={ubahInputMenu}
        tambahMenu={tambahMenu}
      />

      {/* Tabel menu minuman */}
      <Card className="p-6 bg-white rounded-lg shadow-lg">
        <Typography variant="h4" className="text-orange-600 font-bold mb-6">
          Data Minuman
        </Typography>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr className="bg-orange-100 text-orange-600">
                <th className="border border-gray-300 px-6 py-3 text-sm font-bold">
                  Gambar
                </th>
                <th className="border border-gray-300 px-6 py-3 text-sm font-bold">
                  Nama
                </th>
                <th className="border border-gray-300 px-6 py-3 text-sm font-bold">
                  Kategori
                </th>
                <th className="border border-gray-300 px-6 py-3 text-sm font-bold">
                  Harga
                </th>
                <th className="border border-gray-300 px-6 py-3 text-sm font-bold">
                  Deskripsi
                </th>
                <th className="border border-gray-300 px-6 py-3 text-sm font-bold">
                  Rating
                </th>
                <th className="border border-gray-300 px-6 py-3 text-sm font-bold">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {menuDifilter.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-6 py-3">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-md shadow-md"
                    />
                  </td>
                  <td className="border border-gray-300 px-6 py-3 text-gray-700">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 px-6 py-3 text-gray-700">
                    {item.category}
                  </td>
                  <td className="border border-gray-300 px-6 py-3 text-gray-700">
                    {item.price}
                  </td>
                  <td className="border border-gray-300 px-6 py-3 text-gray-700">
                    {item.description}
                  </td>
                  <td className="border border-gray-300 px-6 py-3 text-gray-700">
                    ⭐ {item.rating} / 5
                  </td>
                  <td className="border border-gray-300 px-6 py-3 text-gray-700">
                    <div className="flex justify-center gap-4">
                      <Button
                        onClick={() => suntingMenu(index)}
                        size="sm"
                        className="text-orange-500 hover:text-orange-700 bg-transparent"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        onClick={() => hapusMenu(index)}
                        size="sm"
                        className="text-red-500 hover:text-red-700 bg-transparent"
                      >
                        <FaTrashAlt />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Konten;
