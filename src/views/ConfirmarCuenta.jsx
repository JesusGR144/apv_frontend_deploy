import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import useAlerta from "../hooks/useAlerta";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  // const [alerta, setAlerta] = useState({});
  const {alerta, mostrarAlerta} = useAlerta()

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${token}`;
        const { data } = await clienteAxios(url);

        setCuentaConfirmada(true);

        // setAlerta({
        //   msg: data.msg,
        // });
        mostrarAlerta(data.msg)
      } catch (error) {
        // setAlerta({
        //   msg: error.response.data.msg,
        //   error: true,
        // });
        mostrarAlerta(error.response.data.msg, true)
      }

      setCargando(false);
    };
    confirmarCuenta();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-emerald-600 font-black text-6xl">
          Confirma tu Cuenta y Administra{" "}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl">
        {!cargando && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          <Link className="block text-center my-5 text-gray-500" to="/">
          Iniciar Sesión
        </Link>
        )}
      </div>      
    </>
  );
};

export default ConfirmarCuenta;
