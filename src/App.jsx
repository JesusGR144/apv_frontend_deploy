import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import RutaProtegida from "./layout/RutaProtegida";

import Login from "./views/Login";
import Registrar from "./views/Registrar";
import OlvidePassword from "./views/OlvidePassword";
import NuevoPassword from "./views/NuevoPassword";
import ConfirmarCuenta from "./views/ConfirmarCuenta";
import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";
import AdministrarPacientes from "./views/AdministrarPacientes";
import EditarPerfil from "./views/EditarPerfil";
import CambiarPassword from "./views/CambiarPassword";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route
                path="olvide-password/:token"
                element={<NuevoPassword />}
              />
              <Route path="confirmar/:token" element={<ConfirmarCuenta />} />
            </Route>

            <Route path="/admin" element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path="perfil" element={<EditarPerfil/>} />
              <Route path="cambiar-password" element={<CambiarPassword/>} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
