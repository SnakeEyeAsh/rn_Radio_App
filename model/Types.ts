export type Emisora={
    stationuuid:string,
    name:string,
    favicon:string,
    tags:string[],
    country:string,
    countrycode:string,
    language:string,
    url:string,
}
export type EmisoraAPI={
    stationuuid:string,
    name:string,
    favicon:string|null,
    tags:string|null,
    country:string,
    countrycode:string,
    language:string,
    url:string,
}
export type EmisorasAPI=Array<EmisoraAPI>;
export type Emisoras = Array<Emisora>;