import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

export default function BottomSlider(props) {
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    setSlider(props.data);
  }, [props.data]);

  function getSliderInfoByPosition(sliders, position) {
    const slider = sliders.find((slider) => slider.position === position);
    return slider
      ? { file: slider.file, link: slider.link, type: slider.type }
      : null;
  }
  return (
    <div className="angry-grid-mid">
    {["c1", "c2", "c3", "c4", "c5"].map((position, index) => (
      <div id={`item-mid-${index}`} key={position}>
        <Link
          state={{ isUpdate: false, type: "slider", position }}
          to={getSliderInfoByPosition(slider, position)?.link}
        >
          {getSliderInfoByPosition(slider, position)?.type === "video" ? (
            <video width="640" height="360" controls autoPlay muted>
              <source
                src={
                  getSliderInfoByPosition(slider, position)?.file ||
                  "https://res.cloudinary.com/dx9yad0tk/video/upload/v1711968689/seplhkanttokpngnr5jl.mp4"
                }
                type="video/mp4"
              />
            </video>
          ) : (
            <img
              src={
                getSliderInfoByPosition(slider, position)?.file ||
                "https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt=""
            />
          )}
        </Link>
      </div>
    ))}
  </div>
  );
}
