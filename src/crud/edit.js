import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

function EditProduct() {
  const { Id_saja } = useParams();
  const [product, setProduct] = useState({
    nama: "",
    kelas: "",
    email: "",
    gender: "",
  });
  const [kelasOptions, setKelasOptions] = useState([]);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/murid/${Id_saja}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });

    axios
      .get("http://localhost:3030/kelas")
      .then((response) => {
        setKelasOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching kelas options:", error);
      });
  }, [Id_saja]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
    setIsModified(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isModified) {
      Swal.fire({
        icon: "warning",
        title: "Perhatian!",
        text: "Anda harus mengubah setidaknya satu bidang untuk memperbarui produk.",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda akan menyimpan perubahan yang telah dilakukan.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Batalkan",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://localhost:3030/murid/${Id_saja}`, product)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Sukses!",
              text: "Produk berhasil diperbarui!",
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              window.location.href = "/siswa";
            });
          })
          .catch((error) => {
            console.error("Error updating product:", error);
            Swal.fire({
              icon: "error",
              title: "Gagal!",
              text: "Gagal memperbarui produk. Silakan coba lagi.",
              showConfirmButton: false,
              timer: 2000,
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "info",
          title: "Batal",
          text: "Perubahan dibatalkan.",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const handleBackButtonClick = () => {
    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin kembali? Perubahan yang belum disimpan akan hilang.",
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
      <h2 className="text-center mb-5">Edit Data Siswa</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nama">
          <Form.Label>Nama</Form.Label>
          <Form.Control
            type="text"
            name="nama"
            value={product.nama}
            onChange={handleChange}
            placeholder="Nama"
            required
          />
        </Form.Group>
        <Form.Group controlId="kelas">
          <Form.Label>Kelas</Form.Label>
          <Form.Control
            as="select"
            name="kelas"
            value={product.kelas}
            onChange={handleChange}
            required
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
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={product.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </Form.Group>
        <Form.Group controlId="gender">
          <Form.Label>Jenis Kelamin</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={product.gender}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="laki-laki">Laki-laki</option>
            <option value="perempuan">Perempuan</option>
          </Form.Control>
        </Form.Group>
        <div className="text-center my-4">
          <Button variant="primary" type="submit">
            Simpan
          </Button>
          <Button variant="secondary" className="ml-3" onClick={handleBackButtonClick}>
            Kembali
          </Button>
        </div>
      </Form>
    </Card>
  );
}

export default EditProduct;
