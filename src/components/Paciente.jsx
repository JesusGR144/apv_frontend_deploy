import {} from 'react'
import usePacientes from '../hooks/usePacientes';

const Paciente = ({paciente}) => {

    const {setEdicion, eliminarPaciente} = usePacientes()

    const {nombre, propietario, email, fecha, sintomas, _id} = paciente;

    // const formatearFecha = (fecha) => {
    //     const nuevaFecha = new Date(fecha)
    //     return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(nuevaFecha)
    // }

    // formatear fecha
const formatearFecha = (fecha) => {
  let nuevaFecha
  if (fecha.includes('T00:00:00.000Z')) {
    nuevaFecha = new Date(fecha.split('T')[0].split('-'))
  } else {
    nuevaFecha = new Date(fecha)
  }
  const opciones = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return nuevaFecha.toLocaleDateString('es-ES', opciones)
}

  return (
    <div className='mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl'>
        <p className='font-bold uppercase text-emerald-700 my-2'>Nombre: {''}
            <span className='font-normal normal-case text-gray-600'>{nombre}</span>
        </p>
        <p className='font-bold uppercase text-emerald-700 my-2'>Propietario: {''}
            <span className='font-normal normal-case text-gray-600'>{propietario}</span>
        </p>
        <p className='font-bold uppercase text-emerald-700 my-2'>Correo: {''}
            <span className='font-normal normal-case text-gray-600'>{email}</span>
        </p>
        <p className='font-bold uppercase text-emerald-700 my-2'>Fecha: {''}
            <span className='font-normal normal-case text-gray-600'>{formatearFecha(fecha)}</span>
        </p>
        <p className='font-bold uppercase text-emerald-700 my-2'>Síntomas: {''}
            <span className='font-normal normal-case text-gray-600'>{sintomas}</span>
        </p>

        <div className="flex justify-between my-5">
            <button className='py-2 px-10 bg-emerald-600 hover:bg-emerald-700 font-bold uppercase rounded-lg text-white'
            onClick={() => setEdicion(paciente)}            
            >Editar</button>
            <button 
            className='py-2 px-10 bg-red-600 hover:bg-red-700 font-bold uppercase rounded-lg text-white'
            onClick={() => eliminarPaciente(_id)}
            >Eliminar</button>
        </div>
    </div>
  )
}

export default Paciente