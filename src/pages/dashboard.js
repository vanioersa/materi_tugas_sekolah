import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import {
  Button,
  Container,
  Alert,
  Table,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import Pagination from "react-js-pagination";
import "./css/Dashboard.css";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [muridPerPage, setMuridPerPage] = useState(5);
  const [showFirstLast, setShowFirstLast] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showChart, setShowChart] = useState(false);
  const chartRef = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      setShowChart(true);
      if (tableRef.current) {
        tableRef.current.classList.add("show");
      }
    }
  }, [loading]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3030/murid");
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (pageNumber > 4) {
      setShowFirstLast(false);
    } else {
      setShowFirstLast(true);
    }
  };

  const toggleView = () => {
    setShowChart(!showChart);
  };

  const countByGenderAndClass = () => {
    const data = {
      "10 TKJ": { laki_laki: 0, perempuan: 0 },
      "10 TB": { laki_laki: 0, perempuan: 0 },
      "10 TBSM": { laki_laki: 0, perempuan: 0 },
      "10 AKL": { laki_laki: 0, perempuan: 0 },
      "11 TKJ": { laki_laki: 0, perempuan: 0 },
      "11 TB": { laki_laki: 0, perempuan: 0 },
      "11 TBSM": { laki_laki: 0, perempuan: 0 },
      "11 AKL": { laki_laki: 0, perempuan: 0 },
      "12 TKJ": { laki_laki: 0, perempuan: 0 },
      "12 TB": { laki_laki: 0, perempuan: 0 },
      "12 TBSM": { laki_laki: 0, perempuan: 0 },
      "12 AKL": { laki_laki: 0, perempuan: 0 },
    };

    const randomDarkColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 3; i++) {
        color += letters[Math.floor(Math.random() * 6)];
      }
      return color;
    };

    const randomBrightColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 6) + 9];
      }
      return color;
    };

    students.forEach((student) => {
      if (!data[student.kelas]) {
        data[student.kelas] = { laki_laki: 0, perempuan: 0 };
      }
      if (student.gender === "laki-laki") {
        data[student.kelas].laki_laki++;
        data[student.kelas].color_laki_laki = randomDarkColor();
      } else {
        data[student.kelas].perempuan++;
        data[student.kelas].color_perempuan = randomBrightColor();
      }
    });
    return data;
  };

  const prepareChartData = () => {
    const counts = countByGenderAndClass();
    const kelas = Object.keys(counts);
    const lakiLakiData = [];
    const perempuanData = [];

    kelas.forEach((kls) => {
      lakiLakiData.push(counts[kls].laki_laki || 0);
      perempuanData.push(counts[kls].perempuan || 0);
    });

    return {
      labels: kelas,
      datasets: [
        {
          label: "Laki-laki",
          backgroundColor: kelas.map((kelas) => counts[kelas].color_laki_laki),
          data: lakiLakiData,
        },
        {
          label: "Perempuan",
          backgroundColor: kelas.map((kelas) => counts[kelas].color_perempuan),
          data: perempuanData,
        },
      ],
    };
  };

  useEffect(() => {
    if (chartRef.current && !loading) {
      const ctx = chartRef.current.getContext("2d");
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      chartRef.current.chart = new Chart(ctx, {
        type: "bar",
        data: prepareChartData(),
        options: {
          scales: {
            x: {
              type: "category",
              stacked: true,
            },
            y: {
              type: "linear",
              stacked: true,
              ticks: {
                beginAtZero: true,
              },
            },
          },
        },
      });
    }
  });

  const totalData = students.length;
  const indexOfLastMurid = currentPage * muridPerPage;
  const indexOfFirstMurid = indexOfLastMurid - muridPerPage;
  const filteredMurid = students.filter((murid) =>
    Object.values(murid).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const currentMurid = filteredMurid.slice(indexOfFirstMurid, indexOfLastMurid);
  const firstMuridIndex = indexOfFirstMurid + 1;
  const lastMuridIndex =
    indexOfLastMurid > totalData ? totalData : indexOfLastMurid;

  return (
    <div className="dashboard-container">
      {showChart ? (
        <div className="chart-container">
          <h1 className="dashboard-title">
            Jumlah Murid Laki-laki dan Perempuan di Setiap Kelas
          </h1>
          <div className="toggle-button-container">
            <Button onClick={toggleView} className="toggle-button">
              Tampilkan_Tabel
            </Button>
          </div>
          <div className="chart-wrapper">
            {loading ? (
              <p>Loading...</p>
            ) : students.length === 0 ? (
              <p className="no-data-message">
                Tidak ada data murid yang tersedia.
              </p>
            ) : (
              <canvas ref={chartRef}></canvas>
            )}
          </div>
        </div>
      ) : (
        <div className="data-table">
          <h1 className="dashboard-title">Data Murid</h1>
          <div className="table-options mb-3">
            <Row className="justify-content-between align-items-center">
              <Col xs="auto">
                <div className="d-flex align-items-center">
                  <Button onClick={toggleView} style={{ marginRight: "10px" }}>
                    Tampilkan_Grafik
                  </Button>
                  <Form.Control
                    as="select"
                    value={muridPerPage}
                    onChange={(e) => setMuridPerPage(parseInt(e.target.value))}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={students.length}>Semua</option>
                  </Form.Control>
                </div>
              </Col>
              <Col xs="auto">
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="text"
                    placeholder="Cari siswa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
          </div>
          <Container>
            <div
              className={`table-container ${loading ? "fade-out" : "show"}`}
              ref={tableRef}
            >
              <Table striped bordered hover responsive="md">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Kelas</th>
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
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Container>
          {students.length === 0 && (
            <Alert variant="info" className="text-center mt-3">
              Tidak ada data siswa
            </Alert>
          )}
          <div style={{ marginTop: "20px" }} className="pagination-wrapper">
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
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
