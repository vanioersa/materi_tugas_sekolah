import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Card, Form, Button } from "react-bootstrap";

function Tambah_siswa() {
  const [student, setStudent] = useState({
    nama: "",
    kelas: "",
    email: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      Swal.fire({
        title: "Simpan Data",
        text: "Apakah Anda yakin ingin menyimpan data siswa?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      }).then((result) => {
        if (result.isConfirmed) {
          saveStudentData();
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Semua data harus diisi!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const validateInputs = () => {
    const { nama, kelas, email, gender } = student;
    return (
      nama.trim() !== "" &&
      kelas.trim() !== "" &&
      email.trim() !== "" &&
      gender.trim() !== ""
    );
  };

  const saveStudentData = async () => {
    try {
      const response = await axios.post("http://localhost:3030/murid", student);
      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Siswa berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        window.history.back();
      });
    } catch (error) {
      console.error("Error adding student:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          "Terjadi kesalahan saat menambahkan siswa. Silakan coba lagi nanti!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleBackButtonClick = () => {
    Swal.fire({
      title: "Konfirmasi",
      text:
        "Apakah Anda yakin ingin kembali? Data yang belum disimpan akan hilang.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        window.history.back();
      }
    });
  };
  
  return (
    <Card className="mx-auto my-5 p-5" style={{ maxWidth: "900px" }}>
      <h2 className="text-center mb-5">Tambah Data Siswa</h2>
      <Form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nama:</label>
          <input
            type="text"
            className="form-control"
            name="nama"
            value={student.nama}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Kelas:</label>
          <select
            className="form-control"
            name="kelas"
            value={student.kelas}
            onChange={handleChange}
          >
            <option value="">Pilih Kelas</option>
            <option value="10 TKJ">10 TKJ</option>
            <option value="11 TKJ">11 TKJ</option>
            <option value="12 TKJ">12 TKJ</option>
            <option value="10 AKL">10 AKL</option>
            <option value="11 AKL">11 AKL</option>
            <option value="12 AKL">12 AKL</option>
            <option value="10 TB">10 TB</option>
            <option value="11 TB">11 TB</option>
            <option value="12 TB">12 TB</option>
            <option value="10 TBSM">10 TBSM</option>
            <option value="11 TBSM">11 TBSM</option>
            <option value="12 TBSM">12 TBSM</option>
          </select>
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={student.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select
            className="form-control"
            name="gender"
            value={student.gender}
            onChange={handleChange}
          >
            <option value="">Pilih Gender</option>
            <option value="laki-laki">Laki-laki</option>
            <option value="perempuan">Perempuan</option>
          </select>
        </div>
        <div className="text-center my-4">
          <Button variant="primary" type="submit">
            Simpan
          </Button>
          <Button variant="secondary" className="mx-2" onClick={handleBackButtonClick}>
            Kembali
          </Button>
        </div>
      </Form>
    </Card>
  );
}

export default Tambah_siswa;
