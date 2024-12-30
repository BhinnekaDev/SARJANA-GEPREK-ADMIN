"use client";
import React, { useState, useEffect } from "react";
import { Button, Input, Typography, Card } from "@material-tailwind/react";
import { motion } from "framer-motion";
import Image from "next/image";

const adminPromoTexts = [
  { title: "Kelola Semua dengan Mudah", description: "Sebagai admin, Anda memiliki kontrol penuh untuk mengelola semua aspek platform kami secara efisien." },
  { title: "Pengelolaan Pengguna yang Sederhana", description: "Admin dapat dengan mudah mengelola pengguna, mengatur hak akses, dan memantau aktivitas mereka." },
  { title: "Keamanan Terjamin", description: "Admin bertanggung jawab menjaga keamanan sistem dengan memantau dan mengelola kontrol akses serta kebijakan privasi." },
  { title: "Pemantauan Real-Time", description: "Sebagai admin, Anda dapat memantau aktivitas platform secara real-time untuk memastikan kelancaran operasional." },
  { title: "Pengaturan Konten", description: "Admin memiliki kontrol penuh atas pengaturan dan moderasi konten, memastikan kualitas dan kepatuhan pada kebijakan." },
  { title: "Fleksibilitas dalam Pengelolaan Sistem", description: "Admin dapat menyesuaikan pengaturan sistem sesuai dengan kebutuhan dan kebijakan yang berlaku." },
  { title: "Komunikasi Efektif", description: "Admin dapat mengelola komunikasi internal dengan pengguna, memberikan pemberitahuan, dan mengatur pengumuman." },
  { title: "Pemeliharaan Sistem", description: "Sebagai admin, Anda bertanggung jawab untuk menjaga sistem tetap berjalan dengan baik melalui pemeliharaan rutin dan pembaruan." },
  { title: "Tugas Administratif", description: "Admin mengelola tugas administratif seperti pembuatan akun, pengaturan hak akses, dan pemrosesan permintaan dari pengguna." },
];

const LoginAdmin = () => {
  const fotoAdmin = require("@/assets/images/admin.png");

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % adminPromoTexts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#eff0f3] h-screen w-full p-28 flex justify-center">
      <Card className="w-full bg-blue-600 p-10 rounded-br-none rounded-tr-none shadow-lg">
        <div className="flex flex-col justify-center items-center h-screen ">
          <motion.div key={currentTextIndex} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 1, ease: "easeInOut" }} className="text-center">
            <motion.h2 initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.8 }} className="text-4xl font-bold text-white">
              {adminPromoTexts[currentTextIndex].title}
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} className="text-xl mt-2 text-white">
              {adminPromoTexts[currentTextIndex].description}
            </motion.p>
          </motion.div>
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 0.9 }} transition={{ duration: 5, repeatType: "reverse", repeat: Infinity }} className="w-3/4 mt-6">
            <Image src={fotoAdmin} alt="Admin Promo" layout="responsive" />
          </motion.div>
        </div>
      </Card>

      <Card className="w-full bg-white rounded-bl-none rounded-tl-none shadow-lg">
        <div className="p-6 bg-orange-500 flex flex-col justify-center h-screen">
          <Typography variant="h4" className="text-center text-gray-800 mb-4">
            Masuk
          </Typography>
          <Typography className="text-center text-gray-500 mb-6">Masukkan email dan kata sandi untuk melanjutkan akses.</Typography>
          <form className="space-y-6">
            <Input label="Email" name="email" variant="outlined" className="w-full focus:ring focus:ring-blue-500" />
            <Input label="Kata Sandi" name="password" type="password" variant="outlined" className="w-full focus:ring focus:ring-blue-500" />
            <Button type="submit" color="blue" variant="gradient" className="w-full">
              Masuk
            </Button>
          </form>
          <div className="text-center mt-4">
            <Typography variant="small" className="text-blue-500 cursor-pointer">
              Lupa Kata Sandi?
            </Typography>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginAdmin;
