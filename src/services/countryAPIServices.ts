import { Country, CountrySearch, SuccessResponse } from "@/shared/interfaces/country.interface";
import countryApi from "@/utils/countryAPI.util";
export const findCountry=async(name:string)=>{
    const res= await countryApi.get(`/name/${name}`);
    console.log(res)
    let listResult:CountrySearch[]=[]   
    res.data.map((e:Country)=>{
        let country:CountrySearch ={
            name:e.name.common,
            flag:e.flags.png,
            continents:e.continents
        }
        listResult.push(country);
    })
    console.log(listResult)
    return listResult;
}
export const countryDetail=async(code:string)=>{
    const res= await countryApi.get(`/geo/countries/${code}`);
    return res;
}