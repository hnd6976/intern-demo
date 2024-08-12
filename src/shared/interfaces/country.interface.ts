export interface Flag{
    png:string,
    svg:string
}
export interface NativeName{
     common:string, official:string
}
export interface Name{
    common:string,
    nativeName:Record<string,NativeName>,
    official:string
}
export interface Country{
    name:Name,
    flags:Flag,
    continents:string[]
}
export interface CountrySearch{
    name:string,
    flag:string,
    continents:string[]
}
export interface SuccessResponse<T>{
    status:number,
    data:T,
}