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
    <div className="  my-3 items-center justify-center rounded-md bg-indigo-100 p-5">
      <div className="flex p-2 border-b-2">
        {icon}
        <Typography style={{ fontSize: 16 }}>{title}:</Typography>
      </div>
      <div className="flex ml-8 items-center justify-center ">{children}</div>
    </div>
  );
};
export default CardProps;
