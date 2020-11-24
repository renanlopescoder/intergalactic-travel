import React, { useState } from "react";

import FormInput from "../form-input";
import CustomButton from "../custom-button";

import { auth, signInWithGoogle } from "../../api/firebase.api";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="sign-in">
      <h2 className="title">I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form className="sign-in-form" onSubmit={handleSubmit}>
        <FormInput
          type="email"
          handleChange={({ target }) => setEmail(target.value)}
          name="email"
          value={email}
          required
          label="Email"
        />

        <FormInput
          type="password"
          handleChange={({ target }) => setPassword(target.value)}
          name="password"
          value={password}
          required
          label="Password"
        />
        <div className="buttons">
          <CustomButton type="submit">Sign in</CustomButton>
          <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
            <div>
              <img
                src={require("../../assets/icons/google.svg")}
                className="google-icon"
                alt="Google icon"
                title="Google icon"
              />{" "}
              SIGN IN
            </div>
          </CustomButton>
        </div>
      </form>
    </div>
  );
}
