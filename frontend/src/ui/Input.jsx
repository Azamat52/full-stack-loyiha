import React, { useState } from 'react'
import { useSelector } from 'react-redux'


function Input({
  type = "text",
  id,
  placeholder,
  value,
  label,
  disabled,
  setState
}) {
  const [hide, setHide] = useState(true)
  const toggeHidePassword = () => {
    setHide((prev) => prev ? false : true)
  }
  return (
    <div className="floating-input-wrapper">

      <input
        type={label === "Password" ? (hide ? "password" : "text") : type}
        id={id}
        value={value}
        placeholder=''
        className="floating-input"
        onChange={(e) => setState(type === "file" ? e.target.files[0] : e.target.value)}
        disabled={disabled}
      />

      <label
        htmlFor={id}
        className="floating-label"
      >
        {label} 
      </label>

      {label === "Password" && (
        <div 
          className='hide-password' onClick={toggeHidePassword}
          style={{
            display: value ? "block" : "none"
          }}
        >
          {hide ? (
            <i className="fa-regular fa-eye text-white"></i>
          ): (
            <i className="fa-solid fa-eye-slash text-white"></i>
          )}
        </div>
      )}

    </div>
  )
}

export default Input