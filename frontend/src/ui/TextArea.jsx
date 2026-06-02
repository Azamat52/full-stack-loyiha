import React from 'react'

function TextArea({
  id,
  value,
  label,
  setState
}) {
  return (
    <div className="floating-textarea-wrapper">

      <textarea
        id={id}
        value={value}
        placeholder=" "
        className="floating-textarea"
        onChange={(e) => setState(e.target.value)}
      ></textarea>

      <label
        htmlFor={id}
        className="floating-textarea-label"
      >
        {label}
      </label>

    </div>
  )
}

export default TextArea