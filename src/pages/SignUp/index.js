import React from "react";
import { useNavigate,Link } from "react-router-dom";
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
import { register } from "../../services/auth";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  let navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const [showLoader, setShowLoader] = useState(false);

  const [customer, setCustomer] = useState({
    user_name: "",
    phone: "",
    email: "",
    password: "",
    conformPassword: "",
  });

  const onChangeField = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setCustomer(() => ({
      ...customer,
      [name]: value,
    }));
  };
  const notify = (msg) => toast(msg);

  const signUp = async () => {
    if (
      !customer.user_name ||
      !customer.phone ||
      !customer.email ||
      !customer.password ||
      !customer.conformPassword
    ) {
      toast.warn("Veuillez remplir tous les champs !");
      return; 
    }

    if (
      customer.user_name.length<5

    ) {
      toast.warn("Veuillez indiquez un nom complet !");
      return; 
    }

    if (
      customer.password.length<6

    ) {
      toast.warn("Votre mot de passe est court !");
      return; 
    }
  
    if (customer.password !== customer.conformPassword) {
      toast.warn("Les mots de passe ne correspondent pas !");
      return; 
    }
  
    try {
      setShowLoader(true);
      const response = await register(customer);
      if(!response.error){
        toast.success(response.message, {
          onClose: () => {
            navigate("/signin")
            setShowLoader(false);

          },
        });
      } else{
        toast.error(response.message)
        setShowLoader(false);

      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <section className="signIn mb-5">
        <div className="breadcrumbWrapper res-hide">
          <div className="container-fluid">
            <ul className="breadcrumb breadcrumb2 mb-0">
              <li>
                <Link to="/">Home</Link>{" "}
              </li>
              <li>S'inscrire</li>
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

            <h3>Inscription</h3>
            <form className="mt-4">
              <div className="form-group mb-4 w-100">
                <TextField
                  id="user_name"
                  type="text"
                  name="user_name"
                  label="Nom complet"
                  className="w-100"
                  onChange={onChangeField}
                  value={customer.user_name}
                  required
                />
              </div>
              <div className="form-group mb-4 w-100">
                <TextField
                  id="phone"
                  type="phone"
                  name="phone"
                  label="Numéro de téléphone"
                  className="w-100"
                  onChange={onChangeField}
                  value={customer.phone}
                  required
                />
              </div>
              <div className="form-group mb-4 w-100">
                <TextField
                  id="email"
                  type="email"
                  name="email"
                  label="Email"
                  className="w-100"
                  onChange={onChangeField}
                  value={customer.email}
                  required
                />
              </div>
              <div className="form-group mb-4 w-100">
                <div className="position-relative">
                  <TextField
                    id="password"
                    type={showPassword === false ? "password" : "text"}
                    name="password"
                    label="Password"
                    className="w-100"
                    onChange={onChangeField}
                    value={customer.password}
                    required
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

              <div className="form-group mb-4 w-100">
                <div className="position-relative">
                  <TextField
                    id="conformPassword"
                    type={showPassword1 === false ? "password" : "text"}
                    name="conformPassword"
                    label="Confirm Password"
                    className="w-100"
                    onChange={onChangeField}
                    value={customer.conformPassword}
                    required
                  />
                  <Button
                    className="icon"
                    onClick={() => setShowPassword1(!showPassword1)}
                  >
                    {showPassword1 === false ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </Button>
                </div>
              </div>

              <div className="form-group mt-5 mb-4 w-100">
                <Button className="btn btn-g btn-lg w-100" onClick={signUp}>
                  S'inscrire
                </Button>
              </div>

              <p className="text-center">
                Vous avez déjà un compte ?
                <b>
                  {" "}
                  <Link to="/signIn">Se connecter</Link>
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

export default SignUp;
