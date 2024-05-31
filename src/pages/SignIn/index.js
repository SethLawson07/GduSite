import React from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "./style.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Button } from "@mui/material";
import { useState } from "react";
import GoogleImg from "../../assets/images/google.png";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { useContext } from "react";

import { MyContext } from "../../App";
import { login } from "../../services/auth";
import { ToastContainer, toast } from "react-toastify";

const SignIn = (props) => {
  const navigate = useNavigate();
  let { type } = useParams();

  const [showPassword, setShowPassword] = useState(false);

  const [showLoader, setShowLoader] = useState(false);

  const [customer, setCustomer] = useState({
    email_or_phone_or_phone: "",
    password: "",
  });

  const context = useContext(MyContext);

  const history = useNavigate();

  const onChangeField = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setCustomer(() => ({
      ...customer,
      [name]: value,
    }));
  };

  const signIn = async () => {
    if (!customer.email_or_phone || !customer.password) {
      toast.warn("Veuillez remplir tous les champs !");
      return;
    }
    try {
      setShowLoader(true);
      const response = await login(customer);
      if (!response.error) {
        toast.success(response.message, {
          onClose: () => {
            const paths = {
              checkoutproduct: "/checkoutproduct",
              checkoutservice: "/checkoutservice",
            };
            
            navigate(paths[type] || "/");
            
            localStorage.setItem("islogin", true);
            localStorage.setItem("customer", JSON.stringify(response.data));
            window.location.reload();
            setShowLoader(false);
          },
        });
      } else {
        toast.error(response.message);
        setShowLoader(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="signIn mb-5">
        <div className="breadcrumbWrapper">
          <div className="container-fluid">
            <ul className="breadcrumb breadcrumb2 mb-0">
              <li>
                <Link to="/">Home</Link>{" "}
              </li>
              <li>Se connecter</li>
            </ul>
          </div>
        </div>

        <div className="loginWrapper">
          <div className="card shadow">
            <Backdrop
              sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={showLoader}
              className="formLoader"
            >
              <CircularProgress color="inherit" />
            </Backdrop>

            <h3>Connexion</h3>
            <form className="mt-4">
              <div className="form-group mb-4 w-100">
                <TextField
                  id="email_or_phone"
                  type="email_or_phone"
                  name="email_or_phone"
                  label="Email ou Numéro de téléphone"
                  className="w-100"
                  onChange={onChangeField}
                  value={customer.email_or_phone}
                />
              </div>
              <div className="form-group mb-4 w-100">
                <div className="position-relative">
                  <TextField
                    id="password"
                    type={showPassword === false ? "password" : "text"}
                    name="password"
                    label="Mot de passe"
                    className="w-100"
                    onChange={onChangeField}
                    value={customer.password}
                  />
                  <Button
                    className="icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword === false ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </Button>
                </div>
              </div>

              <div className="form-group mt-5 mb-4 w-100">
                <Button className="btn btn-g btn-lg w-100" onClick={signIn}>
                  Se connecter
                </Button>
              </div>

              {/* <div className="form-group mt-5 mb-4 w-100 signInOr">
                <p className="text-center">OR</p>
                <Button className="w-100" variant="outlined">
                  <img src={GoogleImg} />
                  Se connecter with Google
                </Button>
              </div> */}

              <p className="text-center">
                Vous n'avez pas de compte ?
                <b>
                  {" "}
                  <Link to="/signup">S'inscrire</Link>
                </b>
              </p>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default SignIn;
