import React from "react";

import SignIn from "../../src/components/sign-in";
import SignUp from "../../src/components/sign-up";

export default function LoginPage() {

  return (
    <div className="sign-in-sign-up">
      <link rel="canonical" href="https://infinity-travel.app/signin" />
      <SignIn />
      <SignUp />
    </div>
  );
}