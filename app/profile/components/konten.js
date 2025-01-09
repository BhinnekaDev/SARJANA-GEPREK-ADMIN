import React, { useState } from "react";
import {
  Card,
  Typography,
  Input,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import Image from "next/image";

function Konten() {
  const gambarBawaan = require("@/assets/images/profil.jpg");
  const [isEditable, setIsEditable] = useState(false);
  const [adminData, setAdminData] = useState({
    Foto: null, // null agar menggunakan gambar bawaan
    NamaDepan: "Admin",
    NamaBelakang: "User",
    Email: "admin@example.com",
    NoTelepon: "08123456789",
    Peran: "Administrator",
    JenisKelamin: "Laki-laki", // Tambahkan jenis kelamin
  });

  const tanganiInput = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const toggleEdit = () => setIsEditable(!isEditable);

  return (
    <Card className="h-full w-full p-8 bg-white shadow-lg rounded-lg">
      <div className="flex items-center gap-x-8 pb-8 border-b border-gray-300">
        <div className="relative w-32 h-32">
          <Image
            src={adminData.Foto ? adminData.Foto : gambarBawaan}
            className="w-full h-full object-cover rounded-lg border-4 border-gray-300"
            alt="Profil"
          />
        </div>
        <div>
          <Typography variant="h5" className="font-bold text-gray-900">
            {adminData.NamaDepan} {adminData.NamaBelakang}
          </Typography>
          <Typography className="text-sm text-gray-500">
            {adminData.Email}
          </Typography>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        {[
          {
            label: "Nama Depan",
            name: "NamaDepan",
            value: adminData.NamaDepan,
          },
          {
            label: "Nama Belakang",
            name: "NamaBelakang",
            value: adminData.NamaBelakang,
          },
          { label: "Email", name: "Email", value: adminData.Email },
          {
            label: "Jenis Kelamin",
            name: "JenisKelamin",
            value: adminData.JenisKelamin,
            component: isEditable ? (
              <Select
                name="JenisKelamin"
                value={adminData.JenisKelamin}
                onChange={(e) =>
                  setAdminData({ ...adminData, JenisKelamin: e })
                }
                className="mt-1"
              >
                <Option value="Laki-laki">Laki-laki</Option>
                <Option value="Perempuan">Perempuan</Option>
              </Select>
            ) : (
              <Input value={adminData.JenisKelamin} disabled className="mt-1" />
            ),
          },
          {
            label: "No. Telepon",
            name: "NoTelepon",
            value: adminData.NoTelepon,
          },
          { label: "Peran", name: "Peran", value: adminData.Peran },
        ].map((field, index) => (
          <div key={index}>
            <Typography className="font-medium text-gray-700">
              {field.label}
            </Typography>
            {field.component ? (
              field.component
            ) : (
              <Input
                name={field.name}
                value={field.value}
                onChange={tanganiInput}
                className="mt-1"
                disabled={!isEditable}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-6">
        <Button color="blue" className="w-28" onClick={toggleEdit}>
          {isEditable ? "Simpan" : "Edit"}
        </Button>
      </div>
    </Card>
  );
}

export default Konten;
