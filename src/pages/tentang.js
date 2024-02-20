import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import schoolImage from "./foto/logo4.png";
import "./css/Tentang.css";

const TentangKami = () => {
  return (
    <div className="tentang-kami">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col lg className="text-center">
            <div className="image-container">
              <img src={schoolImage} alt="Image2" className="img-fluid" />
              <p className="motto">Cerdas, Santun dan Berbudi Luhur.</p>
            </div>
            
            <h2 className="tentang-title mt-4 mb-4">
              Selamat Datang di SMK Bina Nusantara Semarang
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={10}>
            <p className="tentang-description">
              SMK Bina Nusantara Semarang bertekad memberikan pendidikan
              berkualitas tinggi yang mempersiapkan siswa untuk menghadapi
              tantangan dunia industri.
            </p>
            <p className="tentang-description">
              Dengan tenaga pengajar berkualitas, fasilitas belajar yang modern,
              dan kurikulum berbasis industri, kami bertujuan untuk menghasilkan
              lulusan yang siap berkontribusi dalam masyarakat dan dunia kerja.
            </p>
            <p className="tentang-description">
              Kami menyediakan berbagai program pendidikan yang mencakup
              teknologi terkini, pelatihan keterampilan praktis, dan
              pembelajaran berbasis proyek untuk mempersiapkan siswa menjadi
              profesional yang kompeten dan inovatif.
            </p>
            <p className="tentang-description">
              Bergabunglah dengan kami untuk meraih pendidikan yang berkualitas
              dan meraih kesuksesan dalam karier Anda di masa depan!
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TentangKami;
