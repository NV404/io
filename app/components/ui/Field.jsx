import { forwardRef } from "react";

import Input from "./Input";

import Lock from "../icons/Lock";
import Ban from "../icons/Ban";
import Beaker from "../icons/Beaker";

function Field(
  {
    component: Component = Input,
    id,
    label,
    required = true,
    secret = false,
    disabled = false,
    inDevelopment = false,
    error,
    currency,
    discountedPrice,
    children,
    ...otherProps
  },
  ref
) {
  return (
    <div className="min-w-0 flex-1 flex flex-col items-stretch justify-start gap-1">
      {label ? (
        <label
          htmlFor={id}
          className="flex flex-row items-center justify-start gap-2"
        >
          <span
            className={[
              "font-medium text-xs uppercase whitespace-nowrap",
              disabled ? "text-neutral-400 cursor-not-allowed" : "",
            ].join(" ")}
          >
            {label}
          </span>
          {inDevelopment ? (
            <Beaker size={12} className="text-neutral-400" />
          ) : null}
          {disabled ? <Ban size={12} className="text-neutral-400" /> : null}
          {secret ? <Lock size={12} className="text-neutral-400" /> : null}
          {!required ? (
            <span className="text-xs text-neutral-400">(Optional)</span>
          ) : null}
        </label>
      ) : null}

      <Component
        ref={ref}
        id={id}
        required={required}
        disabled={disabled}
        {...otherProps}
      />

      {error ? (
        <p className="text-xs text-red-400 font-medium">{error}</p>
      ) : null}

      {children}
    </div>
  );
}

export default forwardRef(Field);
