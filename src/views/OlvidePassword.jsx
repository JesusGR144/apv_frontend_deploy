import {useState} from "react";
import {Link} from "react-router-dom";
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios";
import useAlerta from "../hooks/useAlerta";

const OlvidePassword = () => {
  const [email, setEmail] = useState('');

  // const [alerta, setAlerta] = useState({});
  const {alerta, mostrarAlerta} = useAlerta()

  const handleSubmit = async e => {
      e.preventDefault();

      if(email === '' || email.length < 6){
          // setAlerta({msg: 'El email es obligatorio', error: true})
          mostrarAlerta('El Email es obligatorio', true)
          return;
      }

      try {
        const {data} = await clienteAxios.post('/veterinarios/olvide-password', {email}
        );
        // setAlerta({msg: data.msg})
        mostrarAlerta(data.msg)
      } catch (error) {
        // setAlerta({msg: error.response.data.msg, error: true})
        mostrarAlerta(error.response.data.msg, true)
      }
  }

  return (
    <>
      
        <div>
            <h1 className="text-emerald-600 font-black text-6xl text-center">Recupera tu Acceso y no Pierdas <span className="text-black">tus Pacientes</span></h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl">
          {alerta.msg && <Alerta alerta={alerta} />}
          <form
          onSubmit={handleSubmit}
          >
            <div>
                <label
                  className="uppercase text-gray-600 block text-xl font-bold"
                >
                  Email
                </label>
                <input 
                type="email" 
                placeholder="Email de Registro"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
            </div>
            

            <input 
            type="submit" 
            value="Enviar Instrucciones"
            className="bg-emerald-800 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer md:w-auto"
            />
          </form>

          <nav className="mt-6 lg:flex lg:justify-between">
            <Link
            className="block text-center my-5 text-gray-500"
            to="/registrar">¿No tienes una cuenta? <span className="text-blue-600">Registrate</span></Link>
            <Link
            className="block text-center my-5 text-gray-500"
            to="/">¿Ya tienes una cuenta? <span className="text-blue-600">Inicia Sesión</span></Link>
          </nav>
        </div>
      
    </>
  )
}

export default OlvidePassword