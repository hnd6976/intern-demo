import { Typography, Image, Divider } from "antd";
import { useLocation } from "react-router-dom";
import asian from "@assets/images/asia.png";
import euro from "@assets/images/europe.png";
import { FlagOutlined, GlobalOutlined, SoundOutlined } from "@ant-design/icons";
import Card from "@/components/ui/Card";
import CardProps from "@/components/ui/Card";
import { title } from "process";
const CountryInfor = ({}) => {
  const location = useLocation();
  return (
    <div className=" flex items-center justify-center ">
      <div className="flex  w-[50rem] p-5 ">
        <div className="w-1/2 ">
          <Typography style={{ fontSize: 26, fontWeight: "bold" }}>
            Japan
          </Typography>
          <CardProps
            title="Also known as"
            icon={
              <SoundOutlined
                style={{ fontSize: 25, color: "steelblue", marginRight: 5 }}
              />
            }
          >
            <Typography>Nippon</Typography>
          </CardProps>
          <CardProps
            title="Continents"
            icon={
              <GlobalOutlined
                style={{ fontSize: 25, color: "steelblue", marginRight: 5 }}
              />
            }
          >
            <div className="w-[4rem] h-[6rem]  items-center justify-center m-2">
              <Image src={asian} style={{ height: 60 }} />
              <Typography style={{ fontSize: 16 }}>Asian</Typography>
            </div>
            <div className="w-[4rem] h-[6rem]  items-center justify-center m-2">
              <Image src={euro} style={{ height: 60 }} />
              <Typography style={{ fontSize: 16 }}>Europe</Typography>
            </div>
          </CardProps>
          <CardProps
            title=""
            icon={
              <GlobalOutlined
                style={{ fontSize: 25, color: "steelblue", marginRight: 5 }}
              />
            }
          >
            <div className="w-[4rem] h-[6rem]  items-center justify-center m-2">
              <Image src={asian} style={{ height: 60 }} />
              <Typography style={{ fontSize: 16 }}>Asian</Typography>
            </div>
            <div className="w-[4rem] h-[6rem]  items-center justify-center m-2">
              <Image src={euro} style={{ height: 60 }} />
              <Typography style={{ fontSize: 16 }}>Europe</Typography>
            </div>
          </CardProps>
        </div>

        <div className="w-1/2 ml-10">
          <CardProps
            title="Flag"
            icon={
              <FlagOutlined
                style={{ fontSize: 25, color: "steelblue", marginRight: 5 }}
              />
            }
          >
            <div className="border-2">
              <Image
                src="https://flagcdn.com/w320/jp.png"
                style={{ width: 150 }}
              />
            </div>
          </CardProps>

          <Image
            src="https://mainfacts.com/media/images/coats_of_arms/jp.png"
            style={{ width: 40 }}
          />
        </div>
      </div>
    </div>
  );
};
export default CountryInfor;
