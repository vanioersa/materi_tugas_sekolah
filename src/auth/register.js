import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import schoolLogo from "./foto/logo3.png";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Password and confirm password do not match",
      });
      return;
    }

    try {
      await axios.post("http://localhost:3030/daftar", {
        name,
        email,
        password,
      });

      Swal.fire({
        icon: "success",
        title: "Pendaftaran Berhasil",
        text: "Akun Anda berhasil dibuat!",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        history.push("/login");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        showConfirmButton: false,
        timer: 2000,
        text: error.response.data.message,
      });
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <img
        src={schoolLogo}
        alt="School Logo"
        style={{ width: "100px", marginBottom: "10px" }}
      />
      <h2 style={{ color: "#007bff", marginBottom: "10px" }}>Daftar Akun</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Nama Lengkap"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Kata Sandi"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Konfirmasi Kata Sandi"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
          }}
        >
          Daftar
        </button>
      </form>
      <p style={{ marginTop: "15px", fontSize: "16px", color: "#333" }}>
        Sudah punya akun?{" "}
        <Link to="/login" style={{ color: "#007bff", textDecoration: "none" }}>
          Masuk di sini
        </Link>
      </p>
    </div>
  );
}

export default Register;
