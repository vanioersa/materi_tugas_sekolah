import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBDataTable } from "mdbreact";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Container, Button, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "./css/Siswa.css";

function Siswa() {
  const [muridData, setMuridData] = useState({ columns: [], rows: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3030/murid");
        const columns = [
          { label: "No", field: "no" },
          { label: "Nama", field: "nama" },
          { label: "Email", field: "email" },
          { label: "Gender", field: "gender" },
          { label: "Kelas", field: "kelas" },
          { label: "Action", field: "action" },
        ];
        const rows = response.data.map((murid, index) => ({
          no: index + 1 + ".",
          nama: murid.nama,
          email: murid.email,
          gender: murid.gender,
          kelas: murid.kelas,
          action: (
            <>
              <Button
                variant="primary"
                href={`edit/${murid.id}`}
                className="action-button"
              >
                <FaEdit />
              </Button>
              <Button
                variant="danger"
                onClick={() => confirmDelete(murid.id)}
                className="action-button"
              >
                <FaTrash />
              </Button>
            </>
          ),
        }));
        setMuridData({ columns, rows });
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };

    fetchData();
  }); 

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Konfirmasi Hapus",
      text: "Apakah Anda yakin ingin menghapus data siswa ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3030/murid/${id}`);
      setMuridData((prevState) => ({
        ...prevState,
        rows: prevState.rows.filter((row) => row.id !== id),
      }));
      Swal.fire({
        icon: "success",
        title: "Sukses!",
        text: "Data siswa telah dihapus.",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error("Terjadi kesalahan saat menghapus produk:", error);
      Swal.fire(
        "Error!",
        "Terjadi kesalahan saat menghapus data siswa.",
        "error"
      );
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="title">Daftar Data Siswa</h2>
      <Button variant="success" href="/tambah" className="mb-3">
        <FaPlus /> Tambah
      </Button>
      <MDBDataTable
        striped
        bordered
        small
        data={muridData}
        searching={true}
        searchLabel="Cari....."
      />
      {muridData.rows.length === 0 && (
        <Alert variant="info" className="text-center mt-3">
          Tidak ada data siswa
        </Alert>
      )}
    </Container>
  );
}

export default Siswa;
