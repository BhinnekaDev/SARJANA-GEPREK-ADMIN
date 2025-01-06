import { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Chip,
} from "@material-tailwind/react";
import Image from "next/image";
import { IoPersonAdd } from "react-icons/io5";
import ModalTambahAdmin from "@/components/modalTambahAdmin";
import Memuat from "@/components/memuat";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "@/lib/firebaseConfig"; // Import konfigurasi Firebase

function Konten() {
  const [bukaModalTambahAdmin, setMembukaModalTambahAdmin] = useState(false);
  const [daftarAdmin, setDaftarAdmin] = useState([]);
  const [loading, setLoading] = useState(true);
  const profilAdmin = require("@/assets/images/profil.jpg");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const db = getFirestore(app); // Gunakan db dari Firebase yang sudah dikonfigurasi
        const querySnapshot = await getDocs(collection(db, "admin"));
        const adminData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            email: data.Email,
            nama: data.Nama_Depan + " " + data.Nama_Belakang,
            fungsi: data.Peran_Admin,
            jenisKelamin: data.Jenis_Kelamin,
            status: data.Status, // Asumsikan ada data status
            tanggalPembuatan:
              data.Tanggal_Pembuatan_Akun?.toDate().toLocaleString("id-ID") ||
              "Tidak diketahui",
          };
        });
        setDaftarAdmin(adminData);
      } catch (error) {
        console.error("Error fetching admin data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  return (
    <div>
      <Card className="w-full h-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              Daftar Admin
            </Typography>
            <Button
              className="flex items-center gap-2"
              size="sm"
              color="orange"
              onClick={() => setMembukaModalTambahAdmin(true)}
            >
              <IoPersonAdd className="w-5 h-5" /> Tambah Admin
            </Button>
          </div>
        </CardHeader>

        <CardBody
          className="overflow-y-auto px-0"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          {loading ? (
            <Memuat />
          ) : (
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Admin
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Fungsi
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Status
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Tanggal Pembuatan Akun
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {daftarAdmin.map((admin) => (
                  <tr key={admin.id} className="border-b border-blue-gray-50">
                    <td className="p-4 flex items-center gap-3">
                      <Image
                        src={profilAdmin}
                        alt={`${admin.nama}`}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {admin.nama}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {admin.email}
                        </Typography>
                      </div>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {admin.fungsi}
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {admin.jenisKelamin}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Chip
                        size="sm"
                        value={admin.status?.toUpperCase() || "Tidak Diketahui"}
                        color={admin.status === "Aktif" ? "green" : "red"}
                        className="rounded-md bg-green-100 text-green-700"
                      />
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {admin.tanggalPembuatan}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardBody>

        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Total Admin: {daftarAdmin.length}
          </Typography>
        </CardFooter>

        <ModalTambahAdmin
          terbuka={bukaModalTambahAdmin}
          tertutup={() => setMembukaModalTambahAdmin(false)}
        />
      </Card>
    </div>
  );
}

export default Konten;
