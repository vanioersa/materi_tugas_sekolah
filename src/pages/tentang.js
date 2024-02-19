import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import schoolImage from "./foto/logo1.png";
import "./css/Tentang.css";

const TentangKami = () => {
  return (
    <div className="tentang-kami">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <h2 className="tentang-title text-center mb-4">
              Selamat Datang di SMK Bina Nusantara Semarang
            </h2>
            <p className="tentang-description">
              SMK Bina Nusantara Semarang berkomitmen untuk memberikan
              pendidikan berkualitas tinggi yang mempersiapkan siswa untuk
              menghadapi tantangan dunia industri.
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
              dan meraih kesuksesan dalam karir Anda di masa depan!
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col lg={6}>
            <div className="text-center">
              <Image
                src={schoolImage}
                alt="SMK Bina Nusantara Semarang"
                fluid
                rounded
                className="school-image"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TentangKami;
