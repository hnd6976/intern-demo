import { useEffect,useState} from "react";
const UseDebounce=(value:string,delay=500)=>{
    const [debouncedValue,setDebouncedValue]=useState(value);
    useEffect(()=>{
        const id=setTimeout(()=>{
        setDebouncedValue(value)
        },delay)
        return ()=>{
            clearTimeout(id);
        }
    },[value,delay])
    return debouncedValue;
}
export default UseDebounce;