import React, { useState } from "react";

import FormInput from "../form-input";
import CustomButton from "../custom-button";
import { auth, findOrCreateUser } from "../../api/firebase.api";

export default function SignUp() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const clearForm = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert(signupForm.passwordMatchError);
      return;
    }

    try {
      // Create Firebase Account using the email and password
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );
      await findOrCreateUser(user, { displayName });
      clearForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-up">
      <h2 className="title">I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={({ target }) => setDisplayName(target.value)}
          required
          label="Name"
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          required
          label="Email"
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
          required
          label="Confirm Password"
        />
        <CustomButton type="submit">Sign up</CustomButton>
      </form>
    </div>
  );
}
