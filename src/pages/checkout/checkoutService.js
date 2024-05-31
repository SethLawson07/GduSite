import {
  Button,
  ButtonGroup,
  Divider,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputBase,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

import React, { useContext, useEffect, useRef, useState } from "react";

import { MyContext } from "../../App";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartServices } from "../../state/cart/cartserviceSlice";

const CheckoutService = () => {
  const CartServices = useSelector(selectCartServices);

  const [formFields, setformFields] = useState({
    user: "",
    name: "",
    email: "",
    phoneNumber: "",
    place: "",
    address: "",
    long: "",
    lat: "",
    place: "",
    withdrawMethod: "",
    paymentMethod: "",
    spec: "",
    place: "",
    place: "",
    cart: CartServices,
    amount: "",
  });

  const context = useContext(MyContext);
  const history = useNavigate();

  const placeOrder = () => {
    if (
      formFields.name === "" ||
      formFields.address === "" ||
      formFields.pincode === "" ||
      formFields.phoneNumber === ""
    ) {
      alert("All fields Required");
      return false;
    }

    // const addressInfo = {
    //     name: formFields.name,
    //     phoneNumber: formFields.phoneNumber,
    //     address: formFields.address,
    //     pincode: formFields.pincode,
    //     date: new Date().toLocaleString(
    //         "en-US",
    //         {
    //             month: "short",
    //             day: "2-digit",
    //             year: "numeric",
    //         }
    //     )
    // }

    var options = {
      key: "",
      key_secret: "",
      amount: parseInt(context.cartTotalAmount * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + formFields.name,
      name: "E-Bharat",
      description: "for testing purpose",
      handler: function (response) {
        // console.log(response)

        // const paymentId = response.razorpay_payment_id
        // store in firebase
        // const orderInfo = {
        //     cartItems: context.cartItems,
        //     addressInfo: addressInfo,
        //     date: new Date().toLocaleString(
        //         "en-US",
        //         {
        //             month: "short",
        //             day: "2-digit",
        //             year: "numeric",
        //         }
        //     ),
        //     email: localStorage.getItem("userEmail"),
        //     userid:localStorage.getItem("userId"),
        //     paymentId
        // }

        history("/");
      },

      theme: {
        color: "#3399cc",
      },
    };

    var pay = new window.Razorpay(options);
    pay.open();
  };

  const changeInput = (e) => {
    const { name, value } = e.target;

    setformFields(() => ({
      ...formFields,
      [name]: value,
    }));
  };

  const cartServices = useSelector(selectCartServices);

  const calculateTotalOldPrice = () => {
    const totalPrice = cartServices.reduce(
      (total, service) =>
        total + parseFloat(service.price.replace(/\s/g, "")) * service.quantity,
      0
    );
    return totalPrice.toLocaleString("fr-FR") + " F CFA";
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartServices.reduce(
      (total, item) =>
        total + parseFloat(item.price.replace(/\s/g, "")) * item.quantity,
      0
    );

    return totalPrice.toLocaleString("fr-FR") + " F CFA";
  };

  const [clickedLocation, setClickedLocation] = useState(null);
  const [address, setAddress] = useState("");
  const autocompleteRef = useRef(null);
  const mapCurrent = useRef(null);
  const [mapLocation, setMap] = useState(null);

  function loadGooglePlacesScript(options) {
    const { apiKey, libraries = "places" } = options;

    return new Promise((resolve, reject) => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries}`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
          resolve();
        };

        script.onerror = () => {
          reject(new Error("Failed to load Google Places API script"));
        };

        document.head.appendChild(script);
      } else {
        resolve();
      }
    });
  }

  const scriptOptions = {
    apiKey: "AIzaSyBYfCered5w-HqZwG77t3n4sVV3Q83LZo8",
  };

  let map = null;

  const initMap = () => {
    const mapElement = document.getElementById("map");

    if (mapElement) {
      map = new window.google.maps.Map(mapElement, {
        center: { lat: 6.1375, lng: 1.2096 }, // Coordinates of Lomé, Togo
        zoom: 14,
      });
    }
    if (map) {
      map.addListener("click", handleMapClick);
    }
  };

  const initAutocomplete = () => {
    const input = document.getElementById("autocomplete");
    const togoBounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(4.7369, -1.6602),
      new window.google.maps.LatLng(11.1695, 1.9074)
    );

    const autocompleteOptions = {
      types: ["geocode", "establishment"],
      bounds: togoBounds,
      componentRestrictions: { country: "TG" },
    };

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      input,
      autocompleteOptions
    );

    if (autocompleteRef.current) {
      autocompleteRef.current.addListener("place_changed", () =>
        handlePlaceChanged(autocompleteRef.current)
      );
    }
  };

  const handleMapClick = (event) => {
    if (map) {
      const clickedLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: clickedLocation }, (results, status) => {
        if (status === "OK" && results[0]) {
          const locationDetails = results[0];
          const formattedAddress = locationDetails.formatted_address;
          setAddress(formattedAddress);
        } else {
          console.error("Geocode failed:", status);
        }
      });

      setClickedLocation(clickedLocation);

      if (autocompleteRef.current) {
        const autocompleteOptions = {
          location: clickedLocation,
          radius: 50,
        };
        autocompleteRef.current.setOptions(autocompleteOptions);
        handlePlaceChanged(autocompleteRef.current, clickedLocation);
      } else {
        console.error("Autocomplete is not initialized.");
      }
    }
  };

  const handlePlaceChanged = (autocomplete, location) => {
    const place = autocomplete.getPlace();
    if (place && map) {
      map.setCenter(location || place.geometry.location);
      new window.google.maps.Marker({
        map: map,
        position: location || place.geometry.location,
        title: place.name,
      });
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: location }, (results, status) => {
        if (status === "OK" && results[0]) {
          const address = results[0].formatted_address;
          const input = document.getElementById("autocomplete");
          input.value = address;
        } else {
          console.log("Geocode failed:", status);
        }
      });
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setClickedLocation({ lat: latitude, lng: longitude });

          map?.setCenter({ lat: latitude, lng: longitude });
          map?.setZoom(14);

          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode(
            { location: { lat: latitude, lng: longitude } },
            (results, status) => {
              if (status === "OK" && results[0]) {
                const locationDetails = results[0];
                // console.log(locationDetails);
                const formattedAddress = locationDetails.formatted_address;
                const placeName = locationDetails.name;

                setAddress(formattedAddress);
                formFields.address = placeName;

                // Update state with location details if necessary
              } else {
                console.error("Geocode failed:", status);
              }
            }
          );

          // Add a marker for the current position
          new window.google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: map,
            title: "Votre position actuelle",
          });
        },
        (error) => {
          console.error(
            "Erreur lors de la récupération de la position actuelle :",
            error
          );
        }
      );
    } else {
      console.error(
        "La géolocalisation n'est pas prise en charge par ce navigateur."
      );
    }
  };

  useEffect(() => {
    const initMaps = async () => {
      try {
        await loadGooglePlacesScript(scriptOptions);
        initAutocomplete();
        initMap();
      } catch (error) {
        console.error(error);
      }
    };

    initMaps();
  }, []);

  let navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const isLogin = localStorage.getItem("islogin");
    if (isLogin) {
      setLoggedIn(true);
      const user = JSON.parse(localStorage.getItem("customer"));
      setUsername(user.user_name);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <section className="cartSection mb-5 checkoutPage">
      <div className="container">
        <form>
          <div className="row">
            <div className="col-md-7">
              <div className="form w-75 mt-4 shadow">
                <h3>Information</h3>
                <div className="form-group mb-3 mt-4">
                  <TextField
                    name="name"
                    label="Nom complet"
                    variant="outlined"
                    className="w-100"
                    value={formFields.name}
                    onChange={changeInput}
                  />
                </div>
                <div className="form-group mb-3">
                  <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    className="w-100"
                    value={formFields.email}
                    onChange={changeInput}
                    name="email"
                  />
                </div>
                <div className="form-group mb-3">
                  <TextField
                    label="Numéro de facturation"
                    variant="outlined"
                    className="w-100"
                    value={formFields.phoneNumber}
                    onChange={changeInput}
                    name="phoneNumber"
                  />
                </div>
                <div className="form-group mb-3">
                  <TextField
                    id="autocomplete"
                    placeholder="Rechercher lieu"
                    variant="outlined"
                    className="w-100"
                    // value={formFields.place}
                    type="text"
                    onChange={changeInput}
                    // name="place"
                  />
                </div>
                <div className="form-group mb-3">
                  <TextField
                    disabled
                    placeholder="Adresse"
                    variant="outlined"
                    className="w-100"
                    value={address}
                    onChange={changeInput}
                    name="place"
                  />
                </div>
                <div
                  className="form-group mb-3"
                  style={{ display: "flex", gap: "16px" }}
                >
                  <TextField
                    disabled
                    placeholder="Longitude"
                    variant="outlined"
                    className="w-100"
                    value={clickedLocation?.lng}
                    onChange={changeInput}
                    name="place"
                  />
                  <TextField
                    disabled
                    placeholder="Latitude"
                    variant="outlined"
                    className="w-100"
                    value={clickedLocation?.lat}
                    onChange={changeInput}
                    name="place"
                  />
                </div>{" "}
                <br />
                <div
                  id="map"
                  ref={mapCurrent}
                  style={{ height: "400px", width: "100%" }}
                ></div>{" "}
                <br />
                <div className="form-group">
                  <Button
                    size="large"
                    variant="outlined"
                    onClick={getCurrentLocation}
                  >
                    Ma position actuelle
                  </Button>
                </div>
                <FormLabel name="demo-radio-buttons-group-label">
                  Methode de paiement
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="mobilemoney"
                  // name="radio-buttons-group"
                  name="paymentMethod"
                  onChange={changeInput}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FormControlLabel
                      value="mobilemoney"
                      control={<Radio />}
                      label="Moov money / Tmoney"
                      style={{ marginRight: "8px", marginTop: "10px" }}
                    />
                    <img
                      style={{ height: "20px" }}
                      src="https://res.cloudinary.com/do7y1l2dd/image/upload/v1717071470/Goodness/deznn4ep79bufmdbvy8d.png"
                      alt="Moov money / Tmoney"
                    />
                  </div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FormControlLabel
                      value="goodpay"
                      control={<Radio />}
                      label="Goodpay"
                      style={{ marginRight: "8px", marginTop: "10px" }}
                    />
                    <img
                      style={{ height: "20px" }}
                      src="https://res.cloudinary.com/do7y1l2dd/image/upload/v1717072445/Goodness/odeqxwe0kteecwxerteu.png"
                      alt="Moov money / Tmoney"
                    />
                  </div>
                </RadioGroup>{" "}
                <Button className="btn-g btn-lg">Payer</Button>
              </div>
            </div>

            <div className="col-md-5 cartRightBox">
              <div className="card p-4 ">
                <div className="d-flex align-items-center mb-4">
                  <h1 className="mb-0 textDark textBold">Résumé</h1>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <h4 className="mb-0 textDark">Coût total </h4>
                  <h3 className="ml-auto mb-0 font-weight-bold">
                    <span className="text-g">{calculateTotalOldPrice()}</span>
                  </h3>
                </div>
                {/* <div className="d-flex align-items-center mb-4">
                  <h4 className="mb-0 textDark">Gagné</h4>
                  <h3 className="ml-auto mb-0 font-weight-bold">
                    <span className="text-success">
                      - {calculateTotalDiscount()}
                    </span>
                  </h3>
                </div> */}
               

                <br />
                <div className="d-flex align-items-center mb-4">
                  <h3 className="mb-0 textDark textSemiBold">
                    Total à payer :
                  </h3>
                  <h3 className="ml-auto mb-0 font-weight-bold">
                    <span className="text-g textSemiBold">
                      {calculateTotalPrice()}
                    </span>
                  </h3>
                </div>
                {/* <Link
                //  to={"/checkout"}
                >
                  <Button className="btn-g btn-lg">Commander</Button>
                </Link> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutService;
