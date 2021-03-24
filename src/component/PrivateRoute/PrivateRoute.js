import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";

export function checkIfUserIsLoggedIn() {
  let getJwtToken = localStorage.getItem("jwtToken");

  if (getJwtToken) {
    const currentTime = Date.now() / 1000;

    let decodedJwtToken = jwtDecode(getJwtToken);

    if (decodedJwtToken.exp < currentTime) {
      localStorage.removeItem("jwtToken");
      return false;
    } else {
      return true;
    }
  }
}

const PrivateRoute = ({ component: Component, handleUserLogout, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routerProps) =>
        checkIfUserIsLoggedIn() ? (
          <Component {...routerProps} handleUserLogout={handleUserLogout} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

export default PrivateRoute;

/* If there is a user render the Component + routerProps
    Else redirect the user to the sign-up page. */

/* ...rest is grabbing all of the properties from our MainRouter */
