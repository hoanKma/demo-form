import React from "react";

function Label({ title, isRequired }) {
  return (
    <label
      htmlFor={title}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {title}
      {isRequired && <span className="text-red-500">{" *"}</span>}
    </label>
  );
}

export default Label;
