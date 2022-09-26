import React from "react";
import { LoginTemplate } from "../component/template";

function LoginPage() {
  const input = [
    {
      title: "Username",
      placeholder: "nouvelizza",
      type: "username",
      name: "username",
    },
    {
      title: "Password",
      placeholder: "*******",
      type: "password",
      name: "password",
    },
  ];
  return <LoginTemplate kolom={input} />;
}

export default LoginPage;
