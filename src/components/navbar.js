import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import schoolLogo from "./foto/logo1.png";
import "./css/Navbar.css";

const Navbars = () => {
  return (
    <div className="pembungkus">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
        <Container className="d-flex justify-content-between align-items-center">
          <Navbar.Brand>
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
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/" className="mr-3">
                Beranda
              </Nav.Link>
              <Nav.Link href="/siswa" className="mr-3">
                Siswa
              </Nav.Link>
              <Nav.Link href="/tentang" className="mr-3">
                Tentang Kami
              </Nav.Link>
              <Nav.Link href="/visi-misi" className="mr-3">
                Visi & Misi
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navbars;
