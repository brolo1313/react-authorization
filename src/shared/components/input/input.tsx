import React, { memo } from "react";
import "./input.css";

export interface Props {
  value: string;
  onChange: (e: string) => void;
  error?: string;
  id?: string;
  type?: "text" | "number" | "password" | "email";
  isPassword?: boolean;
  style?: React.CSSProperties;
  onBlur?: () => void;
  onFocus?: () => void;
  label?: string;
  required?: boolean;
  description?: string;

  placeholder?: string;
}

export const TextInput = memo(
  ({
    value,
    onChange,
    id,
    type,
    label,
    required,
    description,
    error,
    placeholder,
  }: Props) => {
    return (
      <div className="textInput-container">
        <label className="textInput-label">
          {label} {required && <span style={{ color: `red` }}> *</span>}
        </label>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          id={id}
          type={type}
          className="textInput-input"
          placeholder={placeholder}
        />
        {description && <p className="textInput-description">{description}</p>}
        {error && <p className="textInput-error">{error}</p>}
      </div>
    );
  }
);
