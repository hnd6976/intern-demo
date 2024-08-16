import { useEffect, useState } from "react";

import { Input, Image } from "antd";
import noResult from "@assets/images/no-result.jpg";
import { findCountry } from "@/services/countryAPIServices";
import UseDebounce from "@/hooks/useDebounce";
import { CountrySearch } from "@/shared/interfaces/country.interface";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
function Search() {
  const [name, setName] = useState("");
  const debouncedName = UseDebounce(name, 1000);
  const findCountryByName = async (key: string) => {
    try {
      const response = await findCountry(key);
      return response;
    } catch (err) {
      return [];
    }
  };
  const { data } = useQuery({
    queryKey: ["result", debouncedName],
    queryFn: () => {
      return findCountryByName(debouncedName);
    },
  });

  function handleInputOnchange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setName(value);
  }
  useEffect(() => {
    findCountryByName(debouncedName);
  }, [debouncedName]);
  return (
    <div className="flex items-center justify-center">
      <div className="h-[28rem] w-[35rem] bg-color-f-03 shadow-xl rounded-md px-10 py-12 flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center">
          <Input onChange={handleInputOnchange} />
          <div className="w-full justify-items-start my-2">
            <p className="text-white text-left">{data?.length + " results"}</p>
          </div>
          {data?.length == 0 ? (
            <div className="h-[18rem]">
              <Image preview={false} src={noResult} height={260} />
            </div>
          ) : (
            <div className="h-[18rem] overflow-y-scroll no-scrollbar">
              {data?.map((e) => {
                return (
                  <NavLink to="/countryInfor" state={{ code: e.cca2 }}>
                    <div
                      key={e.name.common}
                      className="h-[3rem] w-[27rem] flex items-center  bg-indigo-100 rounded-md px-5 py-8 my-5"
                    >
                      <div className="w-1/2">
                        <p>{e.name.common}</p>
                      </div>
                      <div className="w-1/4 items-center justify-center justify-items-center ">
                        <Image height={40} src={e.flags.png} />
                      </div>
                      <div className="w-1/5 flex-1 border-2">
                        {e.continents.map((e) => {
                          return <p key={e}>{e}</p>;
                        })}
                      </div>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
