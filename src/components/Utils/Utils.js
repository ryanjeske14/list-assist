import React from "react";
import { format as formatDate } from "date-fns";
import "./Utils.css";
const icon = require("../../img/icon-3.png");

export function NiceDate({ date, format = "Do MMMM YYYY" }) {
  return formatDate(date, format);
}

export function Hyph() {
  return (
    <span className="Hyph">
      <img src={icon} alt="icon" className="hyph_icon" />
    </span>
  );
}

export function Button({ className, ...props }) {
  return <button className={["Button", className].join(" ")} {...props} />;
}

export function Textarea({ className, ...props }) {
  return <textarea className={["Textarea", className].join(" ")} {...props} />;
}

export function Input({ className, ...props }) {
  return <input className={["Input", className].join(" ")} {...props} />;
}

export function Required({ className, ...props }) {
  return (
    <span className={["Required", className].join(" ")} {...props}>
      &#42;
    </span>
  );
}

export function Section({ className, list, ...props }) {
  const classes = ["Section", list && "Section--list", className]
    .filter(Boolean)
    .join(" ");
  return <section className={classes} {...props} />;
}
