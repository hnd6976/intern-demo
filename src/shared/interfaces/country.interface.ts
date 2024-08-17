export interface Image{
    png:string,
    svg:string
}
export interface NativeName{
     common:string, official:string
}
export interface Currency{
    name:string, symbol:string
}
export interface Name{
    common:string,
    nativeName:Record<string,NativeName>,
    official:string
}
export interface ExtraProps{
    surface_area:number,
    gdp:number,
    gdp_growth:number,
    employment_agriculture:number,
    employment_industry:number,
    employment_services:number
}
export interface Country{
    name:Name,
    cca2:string,
    flags:Image,
    capital:string[],
    currencies:Record<string,Currency>,
    continents:string[],
    borders:string[],
    coatOfArms:Image,
    population:number,
    languages:Record<string,string>,
    extra:ExtraProps|undefined
    timezones:string[]

}
export interface CountrySearch{
    name:Name,
    cca2:string,
    flags:Image,
    continents:string[],
}
export interface SuccessResponse<T>{
    status:number,
    data:T,
}
