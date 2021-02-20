import React from "react";
import "./login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase";
import { actionTypes } from "../contextapi/reducer";
import { useStateValue } from "../contextapi/StateProvider";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth.signInWithPopup(provider).then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://img.icons8.com/cute-clipart/100/000000/chat.png"
          alt=""
        />
        <div className="login_text">
          <h1>Sign in to Chat</h1>
        </div>
        <Button
          fontSize="large"
          variant="contained"
          color="primary"
          type="submit"
          onClick={signIn}
        >
          Sign in With Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
