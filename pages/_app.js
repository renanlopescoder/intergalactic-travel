import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { wrapper } from "../src/redux/store";

import Header from "../src/components/header";
import { auth, findOrCreateUser } from "../src/api/firebase.api";
import { setCurrentUserAction } from "../src/redux/user/user.actions";
import { selectCurrentUser } from "../src/redux/user/user.selectors";

import "../src/styles/global.styles.scss";

function App({ Component, pageProps }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentUser = useSelector((state) => selectCurrentUser(state));

  /**
   * @name useEffect to handle authentication
   * @description this function add a listener to keep the user session
   * - Listen to user authenticate then set the state user with the user details
   * - User come back to the application without logout the session still on from firebase
   * @return (componentWillUnmount) function to unsubscribe from the listener
   */
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      const action = setCurrentUserAction();

      if (userAuth) {
        const user = await findOrCreateUser(userAuth);
        action.payload = user;
        dispatch(action);
        router.push("/");
      }

      // Call default will logout remove the user from state (null)
      dispatch(action);
    });

    return () => {
      // When the component unmount this will be triggered and unsubscribe for changes
      unsubscribeFromAuth();
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { Component, pageProps };
};

export default wrapper.withRedux(App);
