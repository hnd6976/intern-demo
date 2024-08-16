import { Button, Flex, Input, Typography } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import api from "@/utils/countryAPI.util";
import storageService from "@/services/storageServices";
import { Label } from "@/components/ui/Label";
import LocationSensitive from "@/components/ui/LocationSensitive";

const Home = () => {
  return (
    <div>
      <div>
        <LocationSensitive />
      </div>
    </div>
  );
};

export default Home;
