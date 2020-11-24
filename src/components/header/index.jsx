import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import { auth } from "../../api/firebase.api";
import { selectCurrentUser } from "../../redux/user/user.selectors";

function Header() {
  const currentUser = useSelector((state) => selectCurrentUser(state));

  return (
    <div className="header">
      <Link href="/">
        <span className="logo-container">
          <img
            src={require("../../assets/images/logo.png")}
            className="logo"
            alt="Logo"
            title="Logo intergalactic travel"
          />
          <h1 className="title">Intergalactic Travel</h1>
        </span>
      </Link>
      <div className="options">
        <div className="option">
          <Link href="/history">HISTORY</Link>
        </div>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
        ) : (
          <div className="option">
            <Link href="/signin">SIGN IN</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
