import React from "react";
import "./style.css";

export default function MidSlider() {
  return (
    <div className="angry-grid-mid">
      <div id="item-mid-0">
        <img
          src="https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div id="item-mid-1">
        <video width="640" height="360" controls autoplay muted>
          <source
            src="https://res.cloudinary.com/dx9yad0tk/video/upload/v1711968689/seplhkanttokpngnr5jl.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div id="item-mid-2">
        <img
          src="https://images.unsplash.com/photo-1586880244386-8b3e34c8382c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D"
          alt=""
        />
      </div>
      <div id="item-mid-3">
        <img
          src="https://images.unsplash.com/photo-1586880244386-8b3e34c8382c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D"
          alt=""
        />
      </div>
      <div id="item-mid-4">
        <img
          src="https://images.unsplash.com/photo-1586880244386-8b3e34c8382c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D"
          alt=""
        />
      </div>
    </div>
  );
}
