import { Button, Input } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import api from "@/utils/api.util";
import storageService from "@/services/storageServices";
import { Label } from "@/components/ui/Label";
interface ILoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    try {
      const { data: res } = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      if (res.success) {
        storageService.setAccessToken(res.data.access_token);
      }
    } catch (error) {
      // Handle error or redirect to login
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="min-h-[26rem] w-[35rem] bg-color-f-03 shadow-xl rounded-md px-10 py-12 flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold text-gray-100">
            Welcome back!
          </h2>
          <p className="text-gray-300 text-md">
            We're so excited to see you again!
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label
            className={`${
              errors?.email ? "text-red-400" : "text-gray-200"
            } text-md`}
            htmlFor="email"
          >
            EMAIL{" "}
            {errors.email ? (
              <span className="text-sm"> - {errors?.email?.message}</span>
            ) : (
              <span className="text-red-400">*</span>
            )}
          </Label>

          <Controller
            name="email"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Login or password is invalid",
              },
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            }}
            render={({ field }) => (
              <Input
                id="email"
                className="f-input-dark"
                defaultValue=""
                {...field}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label
            className={`${
              errors?.password ? "text-red-400" : "text-gray-200"
            } text-md`}
            htmlFor="password"
          >
            PASSWORD{" "}
            {errors.password ? (
              <span className="text-sm"> - {errors?.password?.message}</span>
            ) : (
              <span className="text-red-400">*</span>
            )}
          </Label>

          <Controller
            name="password"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Login or password is invalid",
              },
              minLength: {
                value: 8,
                message: "8 characters or longer",
              },
            }}
            render={({ field }) => (
              <Input.Password
                id="password"
                className="f-input-dark !focus:bg-color-f-04"
                iconRender={(visible) =>
                  visible ? (
                    <EyeOutlined style={{ color: "white" }} />
                  ) : (
                    <EyeInvisibleOutlined style={{ color: "white" }} />
                  )
                }
                defaultValue=""
                {...field}
              />
            )}
          />

          <span className="text-sm text-blue-500 cursor-pointer hover:underline">
            Forgot your password?
          </span>
        </div>
        <div className="flex flex-col w-full gap-3">
          <Button
            type="primary"
            className="w-full"
            onClick={handleSubmit(onSubmit)}
          >
            Log In
          </Button>
          <p className="text-sm text-gray-300">
            Need an account?{" "}
            <Link className="text-blue-500 hover:underline" to={"/register"}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
