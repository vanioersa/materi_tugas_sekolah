import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import image2 from "./foto/logo4.png";
import "./css/VisiMisi.css";

const VisiMisi = () => {
  return (
    <div className="visi-misi">
      <Container>
        <Row className="align-items-center">
          <Col lg={4} className="mb-4 text-center">
            <div className="image-container">
              <img src={image2} alt="Image2" className="img-fluid" />
              <p className="motto">Cerdas, Santun dan Berbudi Luhur.</p>
            </div>
          </Col>
          <Col lg={8} className="mb-4">
            <div className="visi-misi-text">
              <h2 className="title text-center">Visi & Misi</h2>
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
                    <li>
                      Menyiapkan lulusan yang siap mengisi pasar kerja sesuai
                      dengan bidang profesinya.
                    </li>
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
