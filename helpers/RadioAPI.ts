import { Emisoras, EmisorasAPI } from "model/Types";
import axios from "axios";



export async function consultarEmisoras(emisora:string): Promise<Emisoras> {

    
    const urlCompleta = encodeURI(emisora);
    const API_URL = `http://162.55.180.156/json/stations/byname/${urlCompleta}`;
    const headers ={
        "User-Agent":"RadiosMundo/1.0"
    }

    const response = await axios.get<EmisorasAPI>(API_URL,{headers});
    const resultado = response.data;

    const emisorasTransformadas:Emisoras = resultado.map(emisoraAPI => ({
        stationuuid: emisoraAPI.stationuuid,
        name: emisoraAPI.name,
        favicon: emisoraAPI.favicon===null?"https://imgs.search.brave.com/dOmCTCDoatmsgebcXZYPLvS776w5bauaw1YmSfvFNms/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTAx/MTg1MzMwOC9lcy92/ZWN0b3IvcCVDMyVB/MWdpbmEtbm8tZW5j/b250cmFkYS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9Qk52/NWlIV3JMb1JVWE9w/YWJ2YzdFZkFEeUFv/eGdrNFNnLXduVUpl/Y0hyaz0":emisoraAPI.favicon, // manejar posible undefined
        tags: emisoraAPI.tags ? emisoraAPI.tags.split(",").slice(0,8) : [],
        country: emisoraAPI.country,
        countrycode: emisoraAPI.countrycode,
        language: emisoraAPI.language,
        url: emisoraAPI.url
    }));


    
    return emisorasTransformadas;

}


