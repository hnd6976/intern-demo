import { findBorders, findCountry } from "@/services/countryAPIServices";
import { CountrySearch } from "@/shared/interfaces/country.interface";
import { useQuery } from "@tanstack/react-query";
import { Link, NavLink } from "react-router-dom";
import { Image } from "antd";
type Props = {
  borders: string[];
};
const Borders = (props: Props) => {
  const getListBorders = async (listBorders: string[]) => {
    try {
      let result: CountrySearch[] = [];
      listBorders.map(async (e, i) => {
        let country = await findBorders(e);
        result.push({
          name: country.name,
          continents: country.continents,
          flags: country.flags,
          cca2: country.cca2,
        });
      });
      return result;
    } catch (err) {
      return [];
    }
  };
  const { data } = useQuery({
    queryKey: ["result", props.borders],
    queryFn: () => {
      return getListBorders(props.borders);
    },
  });
  return (
    <div className="flex flex-wrap items-center justify-center">
      {data?.map((e) => {
        return (
          <Link
            onClick={() => {
              window.location.reload();
              window.scrollTo(0, 0);
            }}
            key={e.name.common}
            to="/countryInfor"
            state={{ code: e.cca2, name: e.name.common }}
          >
            <div className="h-[4rem] w-[8rem]  items-center justify-center  bg-indigo-100 rounded-md  my-2">
              <div className="w-full items-center justify-center justify-items-center ">
                <Image height={40} src={e.flags.png} />
              </div>
              <div className="w-full">
                <p>{e.name.common}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default Borders;
