import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import {
  Container,
  Button,
  Alert,
  Table,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import Pagination from "react-js-pagination";
import "./css/Siswa.css";

function Siswa() {
  const [muridData, setMuridData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [muridPerPage, setMuridPerPage] = useState(5);
  const [showFirstLast, setShowFirstLast] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3030/murid");
      setMuridData(response.data);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const indexOfLastMurid = currentPage * muridPerPage;
  const indexOfFirstMurid = indexOfLastMurid - muridPerPage;

  const filteredMurid = muridData.filter((murid) =>
    Object.values(murid).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const currentMurid = filteredMurid.slice(indexOfFirstMurid, indexOfLastMurid);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (pageNumber > 4) {
      setShowFirstLast(false);
    } else {
      setShowFirstLast(true);
    }
  };

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
      fetchData();
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

  const totalData = muridData.length;
  const firstMuridIndex = indexOfFirstMurid + 1;
  const lastMuridIndex =
    indexOfLastMurid > totalData ? totalData : indexOfLastMurid;

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h2 className="title">Daftar Data Siswa</h2>
        </Col>
      </Row>
      <Row className="mb-3 justify-content-between">
        <Col xs="auto">
          <Form.Control
            as="select"
            value={muridPerPage}
            onChange={(e) => setMuridPerPage(parseInt(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={muridData.length}>All</option>
          </Form.Control>
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <Form.Control
            type="text"
            placeholder="Cari siswa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div style={{ width: "10px" }} />
          <Button
            style={{ display: "flex", alignItems: "center" }}
            variant="success"
            href="/tambah"
          >
            <FaPlus />
            Tambah
          </Button>
        </Col>
      </Row>

      <Container>
        <div className="table-container">
          <Table striped bordered hover responsive="md">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Kelas</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentMurid.map((murid, index) => (
                <tr key={index}>
                  <td>{indexOfFirstMurid + index + 1 + "."}</td>
                  <td>{murid.nama}</td>
                  <td>{murid.email}</td>
                  <td>{murid.gender}</td>
                  <td>{murid.kelas}</td>
                  <td>
                    <Button
                      variant="primary"
                      href={`edit/${murid.id}`}
                      className="action-button"
                    >
                      <FaEdit />
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => confirmDelete(murid.id)}
                      className="action-button"
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>

      {muridData.length === 0 && (
        <Alert variant="info" className="text-center mt-3">
          Tidak ada data siswa
        </Alert>
      )}
      <Row>
        <Col>
          <p className="data-info">
            Menampilkan {firstMuridIndex} hingga {lastMuridIndex} dari{" "}
            {totalData} data
          </p>
        </Col>
        <Col className="baru-nih">
          <div className="pagination-container d-flex justify-content-center">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={muridPerPage}
              totalItemsCount={filteredMurid.length}
              pageRangeDisplayed={5}
              onChange={paginate}
              itemClass="page-item"
              linkClass="page-link"
              prevPageText="Seb"
              nextPageText="Sel"
              firstPageText={showFirstLast ? "Pert" : ""}
              lastPageText={showFirstLast ? "Terk" : ""}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Siswa;
