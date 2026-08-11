"use client";
import { useEffect } from "react";

export default function ViewContentPixel() {
  useEffect(() => {
    const fbq = (window as any).fbq;
    if (typeof fbq === "function") {
      fbq("track", "ViewContent", {
        content_name: "The Psychology Behind Writing — Registration",
        value: 99,
        currency: "INR",
      });
    }
  }, []);
  return null;
}
