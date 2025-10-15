import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";
import useAlerta from "../hooks/useAlerta";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [id, setId] = useState(null);

  // const [alerta, setAlerta] = useState({});
  const { alerta, mostrarAlerta } = useAlerta();

  const { guardarPaciente, paciente } = usePacientes();

  useEffect(() => {
    if (paciente?.nombre) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha.split("T")[0]);
      // setFecha(new Date(paciente.fecha).toLocaleDateString('en-CA'));
      setSintomas(paciente.sintomas);
      setId(paciente._id);
    }
  }, [paciente]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar el formulario
    if (
      [
        nombre.trim(),
        propietario.trim(),
        email.trim(),
        fecha,
        sintomas.trim(),
      ].includes("")
    ) {
      // setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      // return;
      mostrarAlerta("Todos los campos son obligatorios", true);
      return;
    }

    guardarPaciente({ nombre, propietario, email, fecha, sintomas, id });
    // setAlerta({
    //   msg: "Guardado Correctamente",
    // });
    mostrarAlerta("Guardado Correctamente");
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setSintomas("");
    setId("");
  };

  const { msg } = alerta;
  return (
    <>
      <h2 className="font-black text-3xl text-center">
        Administrador de Pacientes
      </h2>

      <p className="text-xl mt-5 mb-10 text-center">
        Añade tus pacientes y {""}
        <span className="text-emerald-600 font-bold">Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md py-10 px-5 rounded-md mb-10 lg:mb-0"
      >
        <div className="mb-5">
          <label htmlFor="nombre" className="text-gray-700 font-bold uppercase">
            Nombre Mascota
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="text-gray-700 font-bold uppercase"
          >
            Nombre Propietario
          </label>
          <input
            type="text"
            name="propietario"
            id="propietario"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 font-bold uppercase">
            Email Propietario
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="fecha" className="text-gray-700 font-bold uppercase">
            Fecha Alta
          </label>
          <input
            type="date"
            name="fecha"
            id="fecha"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="text-gray-700 font-bold uppercase"
          >
            Sintomas
          </label>
          <textarea
            name="sintomas"
            id="sintomas"
            placeholder="Describe los Síntomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value={id ? "Guardar Cambios" : "Agregar Paciente"}
          className="bg-emerald-600 w-full p-3 text-white uppercase font-bold hover:bg-emerald-800 cursor-pointer transition-colors rounded-md"
        />
      </form>
      {msg && <Alerta alerta={alerta} />}
    </>
  );
};

export default Formulario;
