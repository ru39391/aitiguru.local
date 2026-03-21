import type { FC } from "react";
import { Layout } from "@/shared/ui";
import { SignInForm } from "@/features/signin-form";

const SignIn: FC = () => <Layout isHolder><SignInForm /></Layout>;

export default SignIn;
