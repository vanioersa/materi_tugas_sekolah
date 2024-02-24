import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar";
import Siswa from "./pages/siswa";
import Dashboard from "./pages/dashboard";
import Tambah_siswa from "./crud/tambah_siswa";
import Edit from "./crud/edit";
import Tentang from "./pages/tentang";
import Login from './auth/login';
import Register from './auth/register'
import VisiMisi from "./pages/visimisi";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/private";
import home_page from "./pages/home_page";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main>
          <Switch>
            <Route path="/" component={home_page} exact />
            <PrivateRoute path="/dashboard" component={Dashboard} exact />
            <PrivateRoute path="/siswa" component={Siswa} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/tambah" component={Tambah_siswa} exact />
            <Route path="/edit/:Id_saja" component={Edit} exact />
            <PrivateRoute path="/tentang" component={Tentang} exact />
            <PrivateRoute path="/visi-misi" component={VisiMisi} exact />
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
