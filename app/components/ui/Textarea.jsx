import { DISABLED_STYLES, FOCUS_STYLES } from "../constants";

export default function Textarea({ className = "", children, ...otherProps }) {
  return (
    <textarea
      className={[
        "font-medium text-sm text-white border border-opacity-50 p-3 rounded-md",
        "border-neutral-800 bg-neutral-900 hover:border-neutral-700",
        "min-w-0 h-auto placeholder:text-neutral-400",
        DISABLED_STYLES,
        FOCUS_STYLES,
        className,
      ].join(" ")}
      {...otherProps}
    >
      {children}
    </textarea>
  );
}
