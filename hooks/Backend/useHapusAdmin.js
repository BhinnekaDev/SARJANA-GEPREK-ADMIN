import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { getAuth, deleteUser } from "firebase/auth";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useHapusAdmin = () => {
  const [sedangMemuatHapusAdmin, setSedangMemuatHapusAdmin] = useState(false);

  const hapusAdmin = async (id, userUid) => {
    try {
      setSedangMemuatHapusAdmin(true);

      const referensiAdmin = doc(database, "admin", id);
      await deleteDoc(referensiAdmin);

      const auth = getAuth();
      const user = auth.currentUser;

      if (user && user.uid === userUid) {
        await deleteUser(user);
      } else {
        await deleteAdminByUid(userUid);
      }

      toast.success("Admin berhasil dihapus!");
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus admin: " + error.message);
    } finally {
      setSedangMemuatHapusAdmin(false);
    }
  };

  const deleteAdminByUid = async (userUid) => {
    const auth = getAuth();
    try {
      const userRecord = await auth.getUser(userUid);
      if (userRecord) {
        await auth.deleteUser(userUid);
      }
    } catch (error) {
      throw new Error(
        "Terjadi kesalahan saat menghapus akun pengguna di Authentication"
      );
    }
  };

  return {
    sedangMemuatHapusAdmin,
    hapusAdmin,
  };
};

export default useHapusAdmin;
