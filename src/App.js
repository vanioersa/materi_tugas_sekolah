import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar";
import Siswa from "./pages/siswa";
import Dashboard from "./pages/dashboard";
import Tambah_siswa from "./crud/tambah_siswa";
import Edit from "./crud/edit";
import Tentang from "./pages/tentang";
import VisiMisi from "./pages/visimisi";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main>
          <Switch>
            <Route path="/" component={Dashboard} exact />
            <Route path="/siswa" component={Siswa} exact />
            <Route path="/tambah" component={Tambah_siswa} exact />
            <Route path="/edit/:Id_saja" component={Edit} exact />
            <Route path="/tentang" component={Tentang} exact />
            <Route path="/visi-misi" component={VisiMisi} exact />
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
