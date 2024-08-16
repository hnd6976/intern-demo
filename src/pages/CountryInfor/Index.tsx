import { Typography, Image, Divider } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import asian from "@assets/images/asia.png";
import euro from "@assets/images/europe.png";
import northAmerica from "@assets/images/north-america.png";
import southAmerica from "@assets/images/south-america.png";
import oceania from "@assets/images/oceania.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarth,
  faFlag,
  faVolumeHigh,
  faStar,
  faLayerGroup,
  faPeopleGroup,
  faLanguage,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import { FlagOutlined, GlobalOutlined, SoundOutlined } from "@ant-design/icons";
import CardProps from "@/components/ui/Card";
import Maps from "@/components/ui/Maps";
import LocationSensitive from "@/components/ui/LocationSensitive";
import { M } from "vite/dist/node/types.d-aGj9QkWt";
import axios from "axios";
import { Country } from "@/shared/interfaces/country.interface";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { Switch } from "@/hooks/Switch";
import ninjasApi from "@/utils/ninjasAPI.util";
import { countryDetail } from "@/services/countryAPIServices";

const CountryInfor = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { code } = location.state;
  const [nativeName, setNativeName] = useState([{ lang: "", name: "" }]);
  const [language, setLanguage] = useState([{ lang: "", name: "" }]);
  const [currencies, setCurrencies] = useState([
    { key: "", name: "", symbol: "" },
  ]);
  const [country, setCountry] = useState<Country>();
  const getInfor = async () => {
    try {
      const res = await countryDetail(code);

      console.log(res);
      setCountry(res);
      setNativeName(getNativeName(res));
      setLanguage(getLanguage(res));
      setCurrencies(getCurrencies(res));
    } catch (err) {}
  };
  const getNativeName = (country: Country) => {
    const result = Object.keys(country.name.nativeName).map((k, v) => ({
      lang: k,
      name:
        country.name.nativeName[k].common +
        ", " +
        country.name.nativeName[k].official,
    }));
    console.log(result);
    return result;
  };
  const getCurrencies = (country: Country) => {
    const result = Object.keys(country.currencies).map((k, v) => ({
      key: k,
      name: country.currencies[k].name,
      symbol: country.currencies[k].symbol,
    }));
    console.log(result);
    return result;
  };
  const getLanguage = (country: Country) => {
    const result = Object.keys(country.languages).map((k, v) => ({
      lang: k,
      name: country.languages[k],
    }));
    console.log(result);
    return result;
  };
  useEffect(() => {
    getInfor();
  }, []);
  useEffect(() => {
    console.log(country?.cca2);
  }, [country]);

  return (
    <div className=" flex items-center justify-center ">
      <div className="flex  w-[50rem] p-5 ">
        <div className="w-1/2 ">
          <Typography style={{ fontSize: 26, fontWeight: "bold" }}>
            {country?.name.common}
          </Typography>
          <CardProps
            title="Also known as"
            icon={
              <FontAwesomeIcon
                icon={faVolumeHigh}
                style={{ fontSize: 20, color: "steelblue", marginRight: 5 }}
              />
            }
          >
            <div>
              {" "}
              {nativeName.map((v, k) => {
                return (
                  <Typography
                    key={k}
                    style={{ fontSize: 16, fontWeight: "500" }}
                  >
                    {v.name}
                  </Typography>
                );
              })}
            </div>
          </CardProps>
          <CardProps
            title="Continents"
            icon={
              <FontAwesomeIcon
                icon={faEarth}
                style={{ fontSize: 20, color: "steelblue", marginRight: 5 }}
              />
            }
          >
            {country?.continents.map((e, i) => {
              return (
                <Switch key={i} condition={e}>
                  <Switch.Case when={"Europe"}>
                    <div className="w-[4rem] h-[6rem]  items-center justify-center m-2">
                      <Image src={euro} style={{ height: 60 }} />
                      <Typography style={{ fontSize: 16 }}>Europe</Typography>
                    </div>
                  </Switch.Case>
                  <Switch.Case when={"Asia"}>
                    <div className="w-[4rem] h-[6rem]  items-center justify-center m-2">
                      <Image src={asian} style={{ height: 60 }} />
                      <Typography style={{ fontSize: 16 }}>Asian</Typography>
                    </div>
                  </Switch.Case>
                  <Switch.Case when={"North America"}>
                    <div className="w-[4rem] h-[6rem]  items-center justify-center m-2">
                      <Image src={northAmerica} style={{ height: 60 }} />
                      <Typography style={{ fontSize: 16 }}>
                        North America
                      </Typography>
                    </div>
                  </Switch.Case>
                  <Switch.Case when={"South America"}>
                    <div className="w-[4rem] h-[6rem]  items-center justify-center m-2">
                      <Image src={southAmerica} style={{ height: 60 }} />
                      <Typography style={{ fontSize: 16 }}>
                        South America
                      </Typography>
                    </div>
                  </Switch.Case>
                  <Switch.Case when={"Oceania"}>
                    <div className="w-[4rem] h-[6rem]  items-center justify-center m-2">
                      <Image src={oceania} style={{ height: 60 }} />
                      <Typography style={{ fontSize: 16 }}>Oceania</Typography>
                    </div>
                  </Switch.Case>
                  <Switch.Default>
                    <div className="case-item">'NA'</div>
                  </Switch.Default>
                </Switch>
              );
            })}
          </CardProps>
          <CardProps
            title="Acreage"
            icon={
              <FontAwesomeIcon
                icon={faLayerGroup}
                style={{ fontSize: 20, color: "steelblue", marginRight: 5 }}
              />
            }
          >
            <Typography style={{ fontSize: 16, fontWeight: "500" }}>
              {country?.extra?.surface_area
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              km<sup>2</sup>
            </Typography>
          </CardProps>
          <CardProps
            title="Population"
            icon={
              <FontAwesomeIcon
                icon={faPeopleGroup}
                style={{ fontSize: 20, color: "steelblue", marginRight: 5 }}
              />
            }
          >
            <Typography style={{ fontSize: 16, fontWeight: "500" }}>
              {country?.population
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Typography>
          </CardProps>
          <CardProps
            title="Official Language"
            icon={
              <FontAwesomeIcon
                icon={faLanguage}
                style={{ fontSize: 20, color: "steelblue", marginRight: 5 }}
              />
            }
          >
            <div>
              {" "}
              {language.map((v, k) => {
                return (
                  <Typography
                    key={k}
                    style={{ fontSize: 16, fontWeight: "500" }}
                  >
                    {v.name}
                  </Typography>
                );
              })}
            </div>
          </CardProps>
          <CardProps
            title="Currencies"
            icon={
              <FontAwesomeIcon
                icon={faCoins}
                style={{ fontSize: 20, color: "steelblue", marginRight: 5 }}
              />
            }
          >
            <div>
              {currencies.map((v, k) => {
                return (
                  <div className="flex">
                    <Typography
                      key={k}
                      style={{ fontSize: 16, fontWeight: "500" }}
                    >
                      {v.name}
                    </Typography>
                    <Typography
                      key={k}
                      style={{
                        fontSize: 18,
                        fontWeight: "500",
                        color: "red",
                        marginLeft: "10px",
                      }}
                    >
                      {v.symbol}
                    </Typography>
                  </div>
                );
              })}
            </div>
          </CardProps>
        </div>

        <div className="w-1/2 ml-10">
          <div>{country && <Maps cca2={country ? country?.cca2 : "US"} />}</div>

          <CardProps
            title="Flag"
            icon={
              <FontAwesomeIcon
                icon={faFlag}
                style={{ fontSize: 20, color: "steelblue", marginRight: 5 }}
              />
            }
          >
            <Image src={country?.flags.png} style={{ width: 150 }} />
          </CardProps>

          <CardProps
            title="Military emblem"
            icon={
              <FontAwesomeIcon
                icon={faStar}
                style={{ fontSize: 20, color: "steelblue", marginRight: 5 }}
              />
            }
          >
            <Image src={country?.coatOfArms.png} style={{ width: 150 }} />
          </CardProps>
        </div>
      </div>
    </div>
  );
};
export default CountryInfor;
