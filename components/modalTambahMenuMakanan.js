"use client";
import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Button,
} from "@material-tailwind/react";

const ModalTambahMenuMakanan = ({
  terbuka,
  ubahStatusModal,
  menuBaru,
  ubahInputMenu,
  tambahMenu,
}) => {
  return (
    <Dialog open={terbuka} handler={ubahStatusModal}>
      <DialogHeader>Tambah Menu Baru</DialogHeader>
      <DialogBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nama Menu"
            name="name"
            value={menuBaru.name}
            onChange={ubahInputMenu}
          />
          <Input
            label="Kategori"
            name="category"
            value={menuBaru.category}
            onChange={ubahInputMenu}
          />
          <Input
            label="Harga"
            name="price"
            value={menuBaru.price}
            onChange={ubahInputMenu}
          />
          <Input
            label="Masukan foto makanan"
            name="image"
            value={menuBaru.image}
            onChange={ubahInputMenu}
          />
          <Textarea
            label="Deskripsi"
            name="description"
            value={menuBaru.description}
            onChange={ubahInputMenu}
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={ubahStatusModal}
          className="mr-2"
        >
          Batal
        </Button>
        <Button
          variant="gradient"
          color="orange"
          onClick={() => {
            tambahMenu();
            ubahStatusModal();
          }}
        >
          Tambahkan
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalTambahMenuMakanan;
