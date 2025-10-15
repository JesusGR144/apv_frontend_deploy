import {useState} from "react"
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta"
import useAlerta from "../hooks/useAlerta";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {

  const {guardarPassword} = useAuth()

  const {alerta, mostrarAlerta} = useAlerta()
  const [password, setPassword] = useState({});

  const handleSubmit = async e => {
      e.preventDefault();

     if( Object.values(password).some(campo => campo === '')){
         mostrarAlerta('Todos los campos son obligatorios', true)
         return;
     }

     if(password.pwd_nuevo.length < 6){
         mostrarAlerta('El Password debe tener mínimo 6 caracteres', true)
         return;
     }

     const respuesta = await guardarPassword(password)

     mostrarAlerta(respuesta.msg); 
  }


  const {msg} = alerta;
  return (
    <>
        <AdminNav/>

        <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} <span className="text-emerald-600 font-bold">Password aquí</span></p>
        

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
        {msg && <Alerta alerta={alerta}/>}
          <form
          onSubmit={handleSubmit}
          >
            <div className="my-3">
              <label
                htmlFor="pwd_actual"
                className="uppercase font-bold text-gray-600"
              >
                Password Actual<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="pwd_actual"
                id="pwd_actual"
                placeholder="Escribe tu Password Actual"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"  
                onChange={e => setPassword({
                  ...password,
                  [e.target.name] : e.target.value
                })}              
              />
            </div>            
            <div className="my-3">
              <label
                htmlFor="pwd_nuevo"
                className="uppercase font-bold text-gray-600"
              >
                Nuevo Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="pwd_nuevo"
                id="pwd_nuevo"
                placeholder="Escribe tu Nuevo Password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"       
                onChange={e => setPassword({
                  ...password,
                  [e.target.name] : e.target.value
                })}            
              />
            </div>            

            <input
              type="submit"
              value="Actualizar Password"
              className="bg-emerald-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default CambiarPassword