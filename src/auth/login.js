import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import schoolLogo from "./foto/logo3.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios
      .get("http://localhost:3030/daftar")
      .then(({ data }) => {
        const admin = data.find(
          (x) => x.email === email && x.password === password
        );
        if (admin) {
          localStorage.setItem("email", admin.email);
          localStorage.setItem("id", admin.id);
          Swal.fire({
            icon: "success",
            title: "Login Berhasil",
            text: "Anda telah berhasil masuk!",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            history.push("/dashboard");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Gagal",
            text: "Email atau password tidak valid",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Terjadi kesalahan. Silakan coba lagi nanti.",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div
      style={{
        textAlign: "center",
        maxWidth: "400px",
        margin: "0 auto",
        marginTop: "150px",
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
      <h2 style={{ color: "#007bff", marginBottom: "10px" }}>Masuk Akun</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Konfirmasi Kata Sandi"
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
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
          Login
        </button>
      </form>
      <p style={{ marginTop: "15px" }}>
        Belum punya akun? <Link to="/register">Daftar di sini</Link>
      </p>
    </div>
  );
}

export default Login;
