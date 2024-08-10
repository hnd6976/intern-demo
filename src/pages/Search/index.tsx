import { useEffect, useState } from "react";
import { Button, Input, Image } from "antd";
import noResult from "@assets/images/no-result.jpg";
import { findCountry } from "@/services/apiServices";
type country = {
  name: string;
  continents: string[];
  flagImageUri: string;
};
function Search() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<country[]>([]);
  const findCountryByName = async () => {
    try {
      const res = await findCountry(name);
      if (res.data) {
        console.log(res.data);
        let listResult: Array<country> = [];
        res.data.map((e: any) => {
          //Can loai bo any
          const country = {
            name: e.name.common,
            continents: e.continents,
            flagImageUri: e.flags.png,
          } as country;
          listResult.push(country);
        });
        setResult(listResult);
      }
    } catch (error) {
      setResult([]);
    }
  };

  useEffect(() => {
    (async () => {
      console.log(name);
      findCountryByName();
    })();
  }, [name]);
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="h-[26rem] w-[35rem] bg-color-f-03 shadow-xl rounded-md px-10 py-12 flex flex-col gap-4">
          <div className="flex flex-col items-center justify-center">
            <Input onChange={(e) => setName(e.target.value)} />
            <div className="w-full justify-items-start my-2">
              <p className="text-white text-left">
                {result.length + " results"}
              </p>
            </div>
            {result.length == 0 ? (
              <div className="h-[18rem]">
                <Image preview={false} src={noResult} height={260} />
              </div>
            ) : (
              <div className="h-[18rem] overflow-y-scroll no-scrollbar">
                {result.map((e) => {
                  return (
                    <div className="h-[3rem] w-[27rem] flex items-center  bg-indigo-100 rounded-md px-5 py-8 my-5">
                      <div className="w-1/2">
                        <p>{e.name}</p>
                      </div>
                      <div className="w-1/4 items-center justify-center justify-items-center ">
                        <Image height={40} src={e.flagImageUri} />
                      </div>
                      <div className="w-1/5 flex-1 border-2">
                        {e.continents.map((e) => {
                          return <p>{e}</p>;
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
