"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const AOSAnimate = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      offset: 100,
      duration: 2000,
      easing: "ease",
    });
  }, []);

  return null;
};

export default AOSAnimate;