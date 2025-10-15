import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import useAlerta from "../hooks/useAlerta";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [tokenConfirmado, setTokenConfirmado] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);
  
  // const [alerta, setAlerta] = useState({});
  const {alerta, mostrarAlerta} = useAlerta()

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const confirmarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);

        setTokenConfirmado(true);

        // setAlerta({
        //   msg: "Coloca tu Nuevo Password",
        // });
        mostrarAlerta('Coloca tu Nuevo Password')
      } catch (error) {
        // setAlerta({
        //   msg: "Hubo un error con el enlace",
        //   error: true,
        // });
        mostrarAlerta('Hubo un error con el enlace', true)
      }
    };
    confirmarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      // setAlerta({
      //   msg: "Password muy corto, agrega minimo 6 caracteres",
      //   error: true,
      // });
      mostrarAlerta('Password muy corto, agrega mínimo 6 caracteres')
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });

      // setAlerta({ msg: data.msg });
      mostrarAlerta(data.msg)

      setPasswordModificado(true);
    } catch (error) {
      // setAlerta({
      //   msg: error.response.data.msg,
      //   error: true,
      // });
      mostrarAlerta(error.responde.data.msg, true)
    }
  };

  return (
    <>
      <div>
        <h1 className="text-emerald-600 font-black text-6xl">
          Restablece tu password y no Pierdas Acceso a{" "}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl">
        {alerta.msg && <Alerta alerta={alerta} />}

        {tokenConfirmado && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Nuevo Password
                </label>
                <input
                  type="password"
                  placeholder="Tu Nuevo Password"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Restablecer Password"
                className="bg-emerald-800 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer md:w-auto"
              />
            </form>
          </>
        )}

        {passwordModificado && (
          <Link className="block text-center my-5 text-gray-500" to="/">
            <span className="text-blue-600">Inicia Sesión</span>
          </Link>
        )}
      </div>
    </>
  );
};

export default NuevoPassword;
