import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

export default function TopSlider(props) {
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
    <div className="angry-grid">
      {["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10"].map(
        (position, index) => (
          <div id={`item-${index}`} key={position}>
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
                    "https://res.cloudinary.com/dx9yad0tk/image/upload/v1712004370/dfosy3xbb5cw31s8og9m.png"
                  }
                  alt=""
                />
              )}
            </Link>
          </div>
        )
      )}
    </div>
  );
}
