import React from "react";
import "./footer.css";

import Icon1 from "../../assets/images/icon-1.svg";
import Icon2 from "../../assets/images/icon-2.svg";
import Icon3 from "../../assets/images/icon-3.svg";
import Icon4 from "../../assets/images/icon-4.svg";
import Icon5 from "../../assets/images/icon-5.svg";
import Logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import paymentImage from "../../assets/images/payment-method.png";

import appStore from "../../assets/images/app-store.jpg";
import googlePlay from "../../assets/images/google-play.jpg";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Newsletter from "../../components/newsletter/index";
import NewsletterImg from "../../assets/images/newsletter.png";

const Footer = () => {
  return (
    <>
      <section className="newsLetterSection">
        <div className="container-fluid">
          <div className="box d-flex align-items-center">
            {/* <div className="info">
              <h2>
                Restez chez vous et faites vos achats quotidiens dans notre boutique
              </h2>
              <p>Commencez votre shopping quotidien avec Nest Mart</p>
              <br />
              <br className="res-hide" />
              <Newsletter />
            </div> */}

            <div className="img">
              <img src={NewsletterImg} className="w-100" alt="Newsletter" />
            </div>
          </div>
        </div>
      </section>

      <div className="footerWrapper">
        {/* <div className="footerBoxes">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="box d-flex align-items-center w-100">
                  <span>
                    <img src={Icon1} alt="Icône 1" />
                  </span>
                  <div className="info">
                    <h4>Meilleurs prix</h4>
                    <p>lorem ipsum</p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="box d-flex align-items-center w-100">
                  <span>
                    <img src={Icon2} alt="Icône 2" />
                  </span>
                  <div className="info">
                    <h4>Livraison gratuite</h4>
                    <p>lorem ipsum</p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="box d-flex align-items-center w-100">
                  <span>
                    <img src={Icon3} alt="Icône 3" />
                  </span>
                  <div className="info">
                    <h4>Super offre </h4>
                    <p>lorem ipsum</p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="box d-flex align-items-center w-100">
                  <span>
                    <img src={Icon4} alt="Icône 4" />
                  </span>
                  <div className="info">
                    <h4>Large assortiment</h4>
                    <p>lorem ipsum</p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="box d-flex align-items-center w-100">
                  <span>
                    <img src={Icon5} alt="Icône 5" />
                  </span>
                  <div className="info">
                    <h4>Retours faciles</h4>
                    <p>lorem ipsum</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <footer>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3 part1">
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/do7y1l2dd/image/upload/v1712795376/Goodness/pmhamtkrlx1xio8vjc76.png"
                    width={100}
                    height={100}
                    alt="Logo"
                  />
                </Link>
                <br />
                <br />
                <p>Plateforme de vente en ligne</p>
                <br />

                <p>
                  <LocationOnOutlinedIcon /> <strong>Adresse</strong>: Lomé-Togo
                </p>
                <p>
                  <HeadphonesOutlinedIcon /> <strong>Appelez-nous:</strong>{" "}
                  (+228) - 92 20 46 71{" "}
                </p>
                <p>
                  <EmailOutlinedIcon /> <strong>Email:</strong>{" "}
                  goodnessunit@gmail.com
                </p>
                <p>
                  <WatchLaterOutlinedIcon /> <strong>Horaires:</strong> 8:00 -
                  20:00, Lundi - Dimanche
                </p>
              </div>

              <div className="col-md-6 part2">
                <div className="row">
                  <div className="col">
                    <h3>Entreprise</h3>
                    <ul className="footer-list mb-sm-5 mb-md-0">
                      <li>
                        <Link to="#">À propos de nous</Link>
                      </li>
                      <li>
                        <Link to="#">Informations de livraison</Link>
                      </li>
                      <li>
                        <Link to="#">Politique de confidentialité</Link>
                      </li>
                      <li>
                        <Link to="#">Conditions générales</Link>
                      </li>
                      <li>
                        <Link to="#">Nous contacter</Link>
                      </li>
                      <li>
                        <Link to="#">Centre d'assistance 24/7</Link>
                      </li>
                    </ul>
                  </div>

                  <div className="col">
                    <h3>Entreprise</h3>
                    <ul className="footer-list mb-sm-5 mb-md-0">
                      <li>
                        <Link to="#">Compte</Link>
                      </li>
                      <li>
                        <Link to="#">Informations de livraison</Link>
                      </li>
                      <li>
                        <Link to="#">Politique de confidentialité</Link>
                      </li>
                      <li>
                        <Link to="#">Conditions générales</Link>
                      </li>
                      <li>
                        <Link to="#">Nous contacter</Link>
                      </li>
                      <li>
                        <Link to="#">Centre d'assistance 24/7</Link>
                      </li>
                    </ul>
                  </div>

                  <div className="col">
                    <h3>Corporate</h3>
                    <ul className="footer-list mb-sm-5 mb-md-0">
                      <li>
                        <Link to="#">À propos de nous</Link>
                      </li>
                      <li>
                        <Link to="#">Informations de livraison</Link>
                      </li>
                      <li>
                        <Link to="#">Politique de confidentialité</Link>
                      </li>
                      <li>
                        <Link to="#">Conditions générales</Link>
                      </li>
                      <li>
                        <Link to="#">Nous contacter</Link>
                      </li>
                      <li>
                        <Link to="#">Centre d'assistance 24/7</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-3 part3">
                <h3>Installer l'application</h3>
                <br className="res-hide" />
                <p>Sur l'App Store ou Google Play</p>

                <div className="d-flex">
                  <Link to={""}>
                    <img src={appStore} width={150} alt="App Store" />
                  </Link>
                  <Link to={""}>
                    <img
                      src={googlePlay}
                      className="mx-2"
                      width={150}
                      alt="Google Play"
                    />
                  </Link>
                </div>

                <br />

                <p>Passerelles de paiement sécurisées</p>
                <img src={paymentImage} alt="Méthodes de paiement" />
              </div>
            </div>

            <hr />

            <div className="row lastStrip">
              <div className="col-md-3 part_1">
                <p>© 2024, Goodness Unit</p>
              </div>

              <div className="col-md-6 d-flex part_2">
                <div className="m-auto d-flex align-items-center phWrap">
                  <div className="phNo d-flex align-items-center mx-5">
                    <span>
                      <HeadphonesOutlinedIcon />
                    </span>
                    <div className="info ml-3">
                      <h3 className="text-g mb-0">92 20 46 71</h3>
                      <p className="mb-0">Centre d'assistance 24/7</p>
                    </div>
                  </div>

                  <div className="phNo d-flex align-items-center  mx-5">
                    <span>
                      <HeadphonesOutlinedIcon />
                    </span>
                    <div className="info ml-3">
                      <h3 className="text-g mb-0">92 20 46 71</h3>
                      <p className="mb-0">Centre d'assistance 24/7</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 part3  part_3">
                <div className="d-flex align-items-center">
                  <h5>Suivez-nous</h5>
                  <ul className="list list-inline">
                    <li className="list-inline-item">
                      <Link to={""}>
                        <FacebookOutlinedIcon />
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to={""}>
                        <TwitterIcon />
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to={""}>
                        <InstagramIcon />
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to={""}>
                        <YouTubeIcon />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
