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

function Konten() {
  const [bukaModalTambahAdmin, setMembukaModalTambahAdmin] = useState(false);
  const [bukaModalEditAdmin, setBukaModalEditAdmin] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [daftarAdmin, setDaftarAdmin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [konfirmasiHapus, setKonfirmasiHapus] = useState(null);
  const profilAdmin = require("@/assets/images/profil.jpg");

  // Define fetchAdminData as a separate function
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
    fetchAdminData(); // Call fetchAdminData on component mount
  }, []);

  const handleDeleteAdmin = (adminId) => {
    setKonfirmasiHapus(adminId);
  };

  const confirmDelete = async () => {
    if (konfirmasiHapus) {
      try {
        const db = getFirestore(app);
        await deleteDoc(doc(db, "admin", konfirmasiHapus));
        // Reload data after deletion
        reloadData();
      } catch (error) {
        console.error("Error deleting admin: ", error);
      } finally {
        setKonfirmasiHapus(null); // Reset confirmation
      }
    }
  };

  const reloadData = async () => {
    setLoading(true);
    await fetchAdminData(); // Call fetchAdminData to refresh admin list
    setLoading(false); // Set loading false after completion
  };

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
                    Admin
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    Fungsi
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    Status
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    Tanggal Pembuatan Akun
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {daftarAdmin.map((admin) => (
                  <tr key={admin.id} className="border-b border-blue-gray-50">
                    <td className="p-4 flex items-center gap-3">
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
                    <td className="p-4">{admin.fungsi}</td>
                    <td className="p-4">
                      <Chip
                        size="sm"
                        value={admin.status?.toUpperCase() || "Tidak Diketahui"}
                        color={admin.status === "Aktif" ? "green" : "red"}
                      />
                    </td>
                    <td className="p-4">{admin.tanggalPembuatan}</td>
                    <td className="p-4">
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

        {/* Modal Konfirmasi Hapus */}
        {konfirmasiHapus && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Typography variant="h6">Konfirmasi Hapus</Typography>
              <Typography>
                Apakah Anda yakin ingin menghapus admin ini?
              </Typography>
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={() => setKonfirmasiHapus(null)}
                  color="gray"
                  className="mr-2"
                >
                  Batal
                </Button>
                <Button onClick={confirmDelete} color="red">
                  Hapus
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Tambah dan Edit Admin */}
        <ModalTambahAdmin
          terbuka={bukaModalTambahAdmin}
          tertutup={() => setMembukaModalTambahAdmin(false)}
        />
        <ModalEditAdmin
          terbuka={bukaModalEditAdmin}
          tertutup={() => setBukaModalEditAdmin(false)}
          admin={selectedAdmin}
          reloadData={() => reloadData()}
        />
      </Card>
    </div>
  );
}

export default Konten;
