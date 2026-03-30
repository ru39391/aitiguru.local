import { useEffect, type FC } from "react";
import { Layout } from "@/shared/ui";
import { SignUpForm } from "@/features/signup-form";

const SignUp: FC = () => {
  useEffect(() => {
    document.title = "Регистрация";
  }, []);

  return <Layout isHolder><SignUpForm /></Layout>;
};

export default SignUp;
