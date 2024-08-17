import { Country, CountrySearch, ExtraProps, SuccessResponse } from "@/shared/interfaces/country.interface";
import countryApi from "@/utils/countryAPI.util";
import ninjasApi from "@/utils/ninjasAPI.util";
export const findCountry=async(name:string)=>{
    const res= await countryApi.get<CountrySearch[]>(`/name/${name}?fields=name,flags,cca2,continents`);
    // console.log(res)
    // let listResult:CountrySearch[]=[]   
    // res.data.map((e:Country)=>{
    //     let country:CountrySearch ={
    //         name:e.name.common,
    //         flag:e.flags.png,
    //         continents:e.continents
    //     }
    //     listResult.push(country);
    // })
    // console.log(listResult)
    return res.data;
}
export const countryDetail=async(code:string,name:string)=>{
    const res= await countryApi.get<Country[]>(`/alpha/${code}`);
    const resExtra= await countryDetailExtra(name)
    let country:Country=res.data[0]
    country.extra=resExtra.data[0];
    return country;
}

export const findBorders=async(code:string)=>{
    const res= await countryApi.get<CountrySearch>(`/alpha/${code}?fields=name,flags,continents,cca2`);
    console.log(res.data)
    return res.data;
}

export const countryDetailExtra=async(name:string)=>{
    const res= await ninjasApi.get<ExtraProps[]>(`?name=${name}`);
    return res;
}