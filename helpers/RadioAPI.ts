import { Emisoras, EmisorasAPI } from "model/Types";
import axios from "axios";



export async function consultarEmisoras(emisora:string,offset:number,limit:number): Promise<Emisoras> {

    
    const urlCompleta = encodeURI(emisora);
    const API_URL = `http://162.55.180.156/json/stations/byname/${urlCompleta}`;
    const headers ={
        "User-Agent":"RadiosMundo/1.0"
    }
    const params = {
        offset: offset,
        limit: limit
    };

    const response = await axios.get<EmisorasAPI>(API_URL,{headers,params});
    const resultado = response.data;

    const emisorasTransformadas:Emisoras = resultado.map(emisoraAPI => ({
        stationuuid: emisoraAPI.stationuuid,
        name: emisoraAPI.name,
        favicon: emisoraAPI.favicon,
        tags: emisoraAPI.tags ? emisoraAPI.tags.split(",").slice(0,8) : [],
        country: emisoraAPI.country,
        countrycode: emisoraAPI.countrycode,
        language: emisoraAPI.language,
        url: emisoraAPI.url
    }));
   
    return emisorasTransformadas;

}


