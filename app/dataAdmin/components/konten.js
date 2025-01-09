import { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Chip,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import Image from "next/image";
import { IoPersonAdd, IoTrashOutline } from "react-icons/io5";
import ModalTambahAdmin from "@/components/modalTambahAdmin";
import ModalEditAdmin from "@/components/modalEditAdmin";
import Memuat from "@/components/memuat";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import app from "@/lib/firebaseConfig";
import { LuListFilter } from "react-icons/lu";

function Konten() {
  const [bukaModalTambahAdmin, setMembukaModalTambahAdmin] = useState(false);
  const [bukaModalEditAdmin, setBukaModalEditAdmin] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [daftarAdmin, setDaftarAdmin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [konfirmasiHapus, setKonfirmasiHapus] = useState(null);
  const profilAdmin = require("@/assets/images/profil.jpg");

  const fetchAdminData = async () => {
    try {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, "admin"));
      const adminData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          email: data.Email,
          nama: data.Nama_Depan + " " + data.Nama_Belakang,
          fungsi: data.Peran_Admin,
          jenisKelamin: data.Jenis_Kelamin,
          status: data.Status,
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

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleDeleteAdmin = (adminId) => {
    setKonfirmasiHapus(adminId);
  };

  const confirmDelete = async () => {
    if (konfirmasiHapus) {
      try {
        const db = getFirestore(app);
        await deleteDoc(doc(db, "admin", konfirmasiHapus));
        reloadData();
      } catch (error) {
        console.error("Error deleting admin: ", error);
      } finally {
        setKonfirmasiHapus(null);
      }
    }
  };

  const reloadData = async () => {
    setLoading(true);
    await fetchAdminData();
    setLoading(false);
  };

  return (
    <div>
      <Card className="max-screen bg-white shadow-md mb-5">
        <div className="w-full flex justify-between text-blue-gray-900 p-4">
          <div className="space-y-2">
            <Typography>Total Admin</Typography>
            <Typography className="text-xl">10000</Typography>
          </div>
          <div className="flex items-center">
            <Button
              size="sm"
              onClick={() => setMembukaModalTambahAdmin(true)}
              className="items-center gap-2 focus:ring-0 bg-orange-400 w-40 h-8 justify-center"
            >
              <p className="text-white mx-auto">Tambah Admin</p>
            </Button>
          </div>
        </div>
      </Card>
      <Card className="w-full h-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex items-center text-center justify-between mx-2">
            <Typography variant="h5" color="blue-gray">
              Tabel Data Admin
            </Typography>
            <div className="">
              <Menu>
                <MenuHandler>
                  <Button className="flex items-center gap-4 tracking-wider bg-transparent text-black border border-gray-500 shadow-md hover:shadow-md">
                    Filter
                    <LuListFilter
                      className="text-xl bg-transparent"
                      color="black"
                    />
                  </Button>
                </MenuHandler>
                <MenuList>
                  <MenuItem>1 Bulan</MenuItem>
                  <MenuItem>1 Tahun</MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
        </CardHeader>

        <CardBody
          className="overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          {loading ? (
            <Memuat />
          ) : (
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-y border-blue-gray-100 py-3 px-4">
                    Admin
                  </th>
                  <th className="border-y border-blue-gray-100 py-2 px-4 text-center">
                    Fungsi
                  </th>
                  <th className="border-y border-blue-gray-100 py-2 px-4 text-center">
                    Status
                  </th>
                  <th className="border-y border-blue-gray-100 py-2 px-4 text-center">
                    Tanggal Pembuatan Akun
                  </th>
                  <th className="border-y border-blue-gray-100 text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {daftarAdmin.map((admin) => (
                  <tr key={admin.id} className="border-b border-blue-gray-50">
                    <td className="p-5 flex items-center gap-3">
                      <Image
                        src={profilAdmin}
                        alt={admin.nama}
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
                    <td className="text-center">{admin.fungsi}</td>
                    <td className="text-center">
                      <span
                        className={
                          admin.status === "Aktif"
                            ? "bg-green-500 bg-opacity-15 text-green-500 text-xs px-4 py-2 uppercase font-bold rounded-lg tracking-wider inline-block"
                            : "bg-red-500 bg-opacity-15 text-red-500 text-xs px-4 py-2 uppercase font-bold tracking-wider rounded-lg inline-block"
                        }
                      >
                        {admin.status?.toUpperCase() || "Tidak Diketahui"}
                      </span>
                    </td>
                    <td className=" text-center">{admin.tanggalPembuatan}</td>
                    <td className="flex justify-center">
                      <Button
                        color="green"
                        size="sm"
                        onClick={() => {
                          setSelectedAdmin(admin);
                          setBukaModalEditAdmin(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        color="red"
                        size="sm"
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="ml-2"
                      >
                        <IoTrashOutline className="w-5 h-5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default Konten;
