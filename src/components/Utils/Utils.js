import React from "react";
import { format as formatDate } from "date-fns";
import "./Utils.css";

export function NiceDate({ date, format = "Do MMMM YYYY" }) {
  return formatDate(date, format);
}

export function Hyph() {
  return (
    <span className="Hyph">
<<<<<<< HEAD
      <img src="../../img/icon-3.png" alt="icon" className="hyph_icon" />
=======
      <img src="/img/icon-3.png" alt="icon" className="hyph_icon" />
>>>>>>> parent of b5469a8... changing img src property for Zeit deploy
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
