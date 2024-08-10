import { Button, Input } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import api from "@/utils/api.util";
import storageService from "@/services/storageServices";
import { Label } from "@/components/ui/Label";

const Home = () => {
  return (
    <div className="flex items-center justify-center">
      <h2>Home Page</h2>
    </div>
  );
};

export default Home;
