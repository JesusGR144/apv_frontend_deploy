import {useState} from "react"

const useAlerta = () => {
    const [alerta, setAlerta] = useState({});

    const mostrarAlerta = (msg, error = false, duracion = 4000) => {
        setAlerta({ msg, error });
        
        setTimeout(() => {
            setAlerta({});
        }, duracion);
    };

    return { alerta, mostrarAlerta };
};

export default useAlerta;  