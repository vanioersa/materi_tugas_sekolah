import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import schoolLogo from "./foto/logo1.png";
import "./css/Navbar.css";

const Navbars = () => {
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
              <Nav.Link href="/" className="mr-3">
                Dashboard
              </Nav.Link>

              <Nav.Link href="/siswa" className="mr-3">
                Siswa
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navbars;
