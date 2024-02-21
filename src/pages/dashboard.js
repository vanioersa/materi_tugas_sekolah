import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import {
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
  const chartRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3030/murid");
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (pageNumber > 4) {
      setShowFirstLast(false);
    } else {
      setShowFirstLast(true);
    }
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
    students.forEach((student) => {
      if (!data[student.kelas]) {
        data[student.kelas] = { laki_laki: 0, perempuan: 0 };
      }
      if (student.gender === "laki-laki") {
        data[student.kelas].laki_laki++;
      } else {
        data[student.kelas].perempuan++;
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
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          data: lakiLakiData,
        },
        {
          label: "Perempuan",
          backgroundColor: "rgba(255, 99, 132, 0.6)",
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
  const firstMuridIndex = indexOfFirstMurid + 1;
  const lastMuridIndex =
    indexOfLastMurid > totalData ? totalData : indexOfLastMurid;

  return (
    <div className="dashboard-container">
      <div className="chart-container">
        <h1 className="dashboard-title">
          Jumlah Murid Laki-laki dan Perempuan di Setiap Kelas
        </h1>
        {loading ? (
          <p>Loading...</p>
        ) : students.length === 0 ? (
          <p className="no-data-message">Tidak ada data murid yang tersedia.</p>
        ) : (
          <canvas ref={chartRef}></canvas>
        )}
      </div>
      <div className="data-table">
        <h2 className="dashboard-title">Data Murid</h2>
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
            <option value={students.length}>All</option>
          </Form.Control>
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <Form.Control
            type="text"
            placeholder="Cari siswa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>
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
        {students.length === 0 && (
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
                prevPageText="Previous"
                nextPageText="Next"
                firstPageText={showFirstLast ? "First" : ""}
                lastPageText={showFirstLast ? "Last" : ""}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Dashboard;
