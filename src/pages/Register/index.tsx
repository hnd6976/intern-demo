import { Button } from "antd";
import { Label } from "@/components/ui/Label";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "@/utils/api.util";
import storageService from "@/services/storageServices";

interface IRegisterForm {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
}
const formSchema = yup.object().shape({
  email: yup.string().email().required("Email is required !"),
  firstName: yup
    .string()
    .required()
    .min(2, "First Name should be 2 chars minimum"),
  lastName: yup
    .string()
    .required()
    .min(2, "Last Name should be 2 chars minimum"),
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
      try {
        const res = await api.post("/auth/register", {
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          password: data.password,
        });
        if (res.data.success) {
          storageService.setAccessToken(res.data.access_token.token);
          reset();
          navigate("/");
        } else {
        }
      } catch (error) {}
    };
    handleRegister();
  };

  return (
    <div className="flex items-center justify-center">
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
          <div className="grid grid-cols-2 gap-x-4">
            <div className="flex flex-col gap-1.5 col-span-1">
              <Label
                className={`${
                  errors?.firstName ? "text-red-400" : "text-gray-200"
                } text-md`}
                htmlFor="firstName"
              >
                FIRST NAME{" "}
              </Label>

              <input
                {...register("firstName")}
                id="firstName"
                className="f-input-dark"
                defaultValue=""
              />
              <p className="text-red-400">{errors.firstName?.message}</p>
            </div>
            <div className="flex flex-col gap-1.5 col-span-1">
              <Label
                className={`${
                  errors?.lastName ? "text-red-400" : "text-gray-200"
                } text-md`}
                htmlFor="lastName"
              >
                LAST NAME{" "}
              </Label>

              <input
                {...register("lastName")}
                id="lastName"
                className="f-input-dark"
                defaultValue=""
              />
              <p className="text-red-400">{errors.lastName?.message}</p>
            </div>
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
