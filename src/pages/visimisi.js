import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import image2 from "./foto/logo2.png";
import "./css/VisiMisi.css";

const VisiMisi = () => {
  return (
    <div className="visi-misi">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col lg={6} className="mb-4">
            <img src={image2} alt="Image2" className="img-fluid" />
          </Col>
          <Col lg={6} className="mb-4">
            <div className="visi-misi-text">
              <h2 className="title">Visi & Misi</h2>
              <div className="content">
                <div className="visi">
                  <h3 className="subtitle">Visi</h3>
                  <p className="text">
                    “Menyiapkan Tenaga Terampil Menengah yang Siap Berkompetisi
                    dan Siap Kerja”
                  </p>
                </div>
                <div className="misi">
                  <h3 className="subtitle">Misi</h3>
                  <ul className="list">
                    <li>Menyiapkan lulusan yang siap mengisi pasar kerja sesuai dengan bidang profesinya.</li>
                    <li>Meningkatkan ketrampilan wirausaha.</li>
                    <li>Menyiapkan ketrampilan sesuai dengan jurusannya.</li>
                  </ul>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VisiMisi;
