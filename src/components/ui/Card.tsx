import { SoundOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { Children, ReactNode } from "react";
type Props = {
  title: string;
  children: ReactNode;
  icon: ReactNode;
};
const CardProps = ({ title, children, icon }: Props) => {
  return (
    <div className="  my-3 items-center justify-center rounded-md bg-indigo-100 p-2 shadow-lg">
      <div className="flex p-2 border-b-2 border-gray-300">
        {icon}
        <Typography style={{ fontSize: 16, fontWeight: "bold", marginLeft: 5 }}>
          {title}
        </Typography>
      </div>
      <div className="flex ml-8 items-center justify-center p-5 ">
        {children}
      </div>
    </div>
  );
};
export default CardProps;
