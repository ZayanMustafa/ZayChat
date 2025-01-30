import React from "react";

export default function InputFeild({ type, name, id, placeholder, required, htmlFor, lable, value, onChange }) {
    return (
        <div>
        <label
            htmlFor={htmlFor}
            className="block mb-2 text-sm font-medium text-dark-900 dark:text-dark"
        >
            {lable}
        </label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            name={name}
            id={id}
            placeholder={placeholder}
            className="bg-dark-50 border border-dark-300 text-dark-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-dark-700 dark:border-dark-600 dark:placeholder-dark-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required={required}
        />
    </div>
    );
}