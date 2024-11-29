import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./../redux/actions/UserActions";
import Message from "./../components/loadingError/Error";
import Loading from "./../components/loadingError/Loading";
import "react-toastify/dist/ReactToastify.css";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      <p>Sign in</p>
      <form onSubmit={submitHandle} className="flex flex-col items-center">
        <input
          className="border-2 border-indigo-600 m-2 p-2"
          type="email"
          placeholder="Enter email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border-2 border-indigo-600 m-2 p-2"
          type="password"
          placeholder="Enter password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="border-2 border-indigo-600 m-2 p-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;
