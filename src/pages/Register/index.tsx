import { Button } from "antd";
import { Label } from "@/components/ui/Label";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "@/utils/countryAPI.util";
import storageService from "@/services/storageServices";
import { useAuth } from "@/contexts/JWTAuthContext";

interface IRegisterForm {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}
const formSchema = yup.object().shape({
  email: yup.string().email().required("Email is required !"),

  username: yup.string().required().min(2, "Name should be 2 chars minimum"),
  password: yup
    .string()
    .required()
    .min(8, "Password should be 8 chars minimum"),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const Register = () => {
  const { registerAccount } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
    //Tam thoi chua ket noi
    const handleRegister = async () => {
      await registerAccount(data.email, data.username, data.password);
    };
    try {
      handleRegister();
      navigate("/login");
    } catch (err) {}
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="min-h-[26rem] w-[35rem] bg-color-f-03 shadow-xl rounded-md px-10 py-12 flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold text-gray-100">
            Create an account
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1.5">
            <Label
              className={`${
                errors?.email ? "text-red-400" : "text-gray-200"
              } text-md`}
              htmlFor="email"
            >
              EMAIL{" "}
            </Label>

            <input
              {...register("email")}
              id="email"
              className="f-input-dark"
              defaultValue=""
            />
            <p className="text-red-400">{errors.email?.message}</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label
              className={`${
                errors?.email ? "text-red-400" : "text-gray-200"
              } text-md`}
              htmlFor="email"
            >
              USERNAME{" "}
            </Label>

            <input
              {...register("username")}
              id="username"
              className="f-input-dark"
              defaultValue=""
            />
            <p className="text-red-400">{errors.username?.message}</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              className={`${
                errors?.password ? "text-red-400" : "text-gray-200"
              } text-md`}
              htmlFor="password"
            >
              PASSWORD{" "}
            </Label>

            <input
              {...register("password")}
              id="password"
              className="f-input-dark"
              defaultValue=""
              type="password"
            />
            <p className="text-red-400">{errors.password?.message}</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label
              className={`${
                errors?.passwordConfirmation ? "text-red-400" : "text-gray-200"
              } text-md`}
              htmlFor="confirmPassword"
            >
              CONFIRM PASSWORD{" "}
            </Label>

            <input
              {...register("passwordConfirmation")}
              id="passwordConfirmation"
              className="f-input-dark"
              defaultValue=""
              type="password"
            />
            <p className="text-red-400">
              {errors.passwordConfirmation?.message}
            </p>
          </div>
          <div className="flex flex-col w-full gap-3 my-3">
            <Button
              type="primary"
              className="w-full"
              onClick={handleSubmit(onSubmit)}
            >
              Register
            </Button>
            <p className="text-sm text-gray-300">
              Already have an account?{" "}
              <Link className="text-blue-500 hover:underline" to={"/login"}>
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
