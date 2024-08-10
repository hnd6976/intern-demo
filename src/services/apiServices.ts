import api from "@/untils/api.until";
export const findCountry=async(name:string)=>{
    const res= await api.get(`/name/${name}`);
    return res;
}
export const countryDetail=async(code:string)=>{
    const res= await api.get(`/geo/countries/${code}`);
    return res;
}