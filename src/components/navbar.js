import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import schoolLogo from "./foto/logo1.png";
import Swal from "sweetalert2";
import "./css/Navbar.css";

const Navbars = () => {
  const Keluar = () => {
    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin Keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Berhasil Keluar",
          text: "Anda telah berhasil Keluar",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          localStorage.clear();
          window.location.href = "/login";
        });
      } else {
        Swal.fire({
          title: "Batal Keluar",
          text: "Anda membatalkan Keluar",
          icon: "info",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  const isAuthenticated = () => {
    return localStorage.getItem("email") !== null;
  };

  return (
    <div className="pembungkus">
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        sticky="top"
      >
        <Container>
          <Navbar.Brand className="justify-content-start">
            <img
              alt="Logo Sekolah"
              src={schoolLogo}
              width="50"
              height="50"
              className="logo-image mr-2"
            />
            <span className="brand-name"> SMK Bina Nusantara</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="ml-auto">
              {!isAuthenticated() && (
                <>
                  <Nav.Link href="/" className="mr-3">
                    Beranda
                  </Nav.Link>

                  <Nav.Link href="/login" className="mr-3">
                    Login
                  </Nav.Link>
                </>
              )}

              {isAuthenticated() && (
                <>
                  <Nav.Link href="/dashboard" className="mr-3">
                    Dashboard
                  </Nav.Link>
                  <Nav.Link href="/siswa" className="mr-3">
                    Data Siswa
                  </Nav.Link>

                  <NavDropdown
                    title="Profile"
                    id="collasible-nav-dropdown"
                    className="mr-3"
                  >
                    <div className="buruan">
                      <NavDropdown.Item
                        href="/visi-misi"
                        className="profile-item"
                      >
                        Visi & Misi
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="/tentang"
                        className="profile-item"
                      >
                        Tentang
                      </NavDropdown.Item>
                    </div>
                  </NavDropdown>

                  <Nav.Link onClick={Keluar} className="mr-3">
                    Keluar
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navbars;
