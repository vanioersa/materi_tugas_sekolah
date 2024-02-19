import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { MDBDataTable } from "mdbreact";
import { Alert } from "react-bootstrap";
// import Form from "react-bootstrap/Form";
// import BootstrapTable from "react-bootstrap-table-next";
// import paginationFactory from "react-bootstrap-table2-paginator";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./css/Dashboard.css";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [muridData, setMuridData] = useState({ columns: [], rows: [] });
  const chartRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:3030/murid")
      .then((response) => {
        const updatedStudents = response.data.map((student, index) => ({
          ...student,
          id: index + 1,
        }));
        setStudents(updatedStudents);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3030/murid");
      const murids = response.data;
      const columns = [
        { label: "No", field: "no" },
        { label: "Nama", field: "nama" },
        { label: "Email", field: "email" },
        { label: "Gender", field: "gender" },
        { label: "Kelas", field: "kelas" },
      ];
      const rows = response.data.map((murid, index) => ({
        no: index + 1 + ".",
        nama: murid.nama,
        email: murid.email,
        gender: murid.gender,
        kelas: murid.kelas,
      }));
      setMuridData({ columns, rows });
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
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
  }, [students, loading]);

  const columns = [
    {
      dataField: "id",
      text: "No",
      formatter: (rowIndex) => `${rowIndex + 0}.`,
      headerStyle: { width: "5%" },
    },
    {
      dataField: "nama",
      text: "Nama",
      headerStyle: { width: "30%" },
    },
    {
      dataField: "email",
      text: "Email",
      headerStyle: { width: "30%" },
    },
    {
      dataField: "gender",
      text: "Gender",
      headerStyle: { width: "15%" },
    },
    {
      dataField: "kelas",
      text: "Kelas",
      headerStyle: { width: "20%" },
    },
  ];

  const rowStyle = (row, rowIndex) => {
    const style = {};
    if (rowIndex % 2 === 0) {
      style.backgroundColor = "#f9f9f9";
    }
    return style;
  };

  const filteredStudents = students.filter((student) =>
    Object.values(student).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
        <MDBDataTable striped bordered small data={muridData} />
        {muridData.rows.length === 0 && (
          <Alert variant="info" className="text-center mt-3">
            Tidak ada data siswa
          </Alert>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
