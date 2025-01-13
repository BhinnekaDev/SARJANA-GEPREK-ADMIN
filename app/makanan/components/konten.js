"use client";
import React, { useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import ModalTambahMenuMakanan from "@/components/modalTambahMenuMakanan";
import Image from "next/image";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import React Icons

const fotoMakanan = require("@/assets/images/LogoAyam.png");
const menuAwal = [
  {
    name: "Ayam Goreng",
    category: "Makanan Berat",
    price: "Rp 25.000",
    description: "Ayam goreng lezat dan renyah",
    image: fotoMakanan,
    rating: 4,
  },
  {
    name: "Nasi Goreng",
    category: "Makanan Berat",
    price: "Rp 20.000",
    description: "Nasi goreng dengan bumbu spesial",
    image: fotoMakanan,
    rating: 5,
  },
  {
    name: "Burger Ayam",
    category: "Makanan Berat",
    price: "Rp 30.000",
    description: "Burger dengan patty ayam empuk",
    image: fotoMakanan,
    rating: 4,
  },
  {
    name: "Kentang Goreng",
    category: "Cemilan",
    price: "Rp 12.000",
    description: "Kentang goreng crispy dengan saus mayo",
    image: fotoMakanan,
    rating: 4,
  },
  {
    name: "Es Teh Manis",
    category: "Minuman",
    price: "Rp 8.000",
    description: "Es teh manis segar",
    image: fotoMakanan,
    rating: 5,
  },
];

const Konten = () => {
  const [menuMakanan, setMenuMakanan] = useState(menuAwal);
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
    setMenuMakanan((prev) => [
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
  };

  const hapusMenu = (index) => {
    setMenuMakanan((prev) => prev.filter((_, i) => i !== index));
  };

  const suntingMenu = (index) => {
    const item = menuMakanan[index];
    setMenuBaru(item); // Set the item values into the form fields for editing
    bukaModal(); // Open the modal to edit
  };

  const menuDifilter =
    kategoriDipilih === "Semua Kategori"
      ? menuMakanan
      : menuMakanan.filter((item) => item.category === kategoriDipilih);

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h3" className="text-orange-700 font-extrabold">
            Menu Makanan
          </Typography>
          <Button
            onClick={bukaModal}
            className="bg-orange-500 hover:bg-orange-700 shadow-lg"
          >
            Tambah Menu
          </Button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Pilih makanan favorit Anda dari daftar di bawah ini.
        </p>
        <select
          value={kategoriDipilih}
          onChange={(e) => setKategoriDipilih(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="Semua Kategori">Semua Kategori</option>
          <option value="Makanan Berat">Makanan Berat</option>
          <option value="Cemilan">Cemilan</option>
          <option value="Minuman">Minuman</option>
        </select>
      </Card>

      {/* Modal untuk menambahkan menu baru */}
      <ModalTambahMenuMakanan
        terbuka={modalTerbuka}
        ubahStatusModal={tutupModal}
        menuBaru={menuBaru}
        ubahInputMenu={ubahInputMenu}
        tambahMenu={tambahMenu}
      />

      {/* Tabel menu makanan */}
      <Card className="p-6 bg-white rounded-lg shadow-lg">
        <Typography variant="h4" className="text-orange-700 font-bold mb-6">
          Data Makanan
        </Typography>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr className="bg-orange-100 text-orange-700 flex-auto justify-center">
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
                      src={fotoMakanan}
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
                        className="text-blue-500 hover:text-blue-700 bg-transparent"
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
