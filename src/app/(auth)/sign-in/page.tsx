import React from "react";
import { LoginForm } from "@/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | PetitionFund",
  description: "Sign in to PetitionFund",
};

const SignInPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center grow">
      <LoginForm />
    </div>
  );
};

export default SignInPage;
