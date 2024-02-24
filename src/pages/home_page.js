import React from 'react';
import schoolLogo from './foto/logo1.png';
import './css/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <img src={schoolLogo} alt="School Logo" className="school-logo" />
        <h1 className="school-name">SMK Bina Nusantara</h1>
      </header>
      <main className="homepage-main">
        <section className="welcome-section">
          <h2 className="section-title">Selamat Datang di SMK Bina Nusantara</h2>
          <p className="section-description">
            SMK Bina Nusantara adalah sekolah yang berkomitmen untuk memberikan pendidikan berkualitas dan mempersiapkan siswa untuk menjadi profesional yang kompeten di bidangnya.
          </p>
        </section>
        <section className="about-section">
          <h2 className="section-title">Tentang Kami</h2>
          <p className="section-description">
            SMK Bina Nusantara didirikan pada tahun 1990 dengan visi untuk menjadi pusat pendidikan terbaik dalam pembangunan sumber daya manusia yang unggul dan berdaya saing.
          </p>
          <p className="section-description">
            Kami menawarkan berbagai program keahlian di bidang teknologi, bisnis, dan seni yang dirancang untuk memenuhi kebutuhan pasar kerja saat ini.
          </p>
        </section>
      </main>
      <footer className="homepage-footer">
        <p>&copy; 2024 SMK Bina Nusantara</p>
      </footer>
    </div>
  );
};

export default HomePage;
