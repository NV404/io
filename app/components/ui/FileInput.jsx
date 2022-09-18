import { DISABLED_STYLES, FOCUS_STYLES } from "../constants";

export default function FileInput({ className, ...otherProps }) {
  return (
    <input
      type="file"
      className={[
        "min-w-0 w-full text-sm file:text-white",
        "file:mr-2 file:font-medium file:text-xs file:text-white file:border file:border-opacity-50 file:px-3 file:py-1 file:rounded-md file:border-neutral-800 file:bg-neutral-900 file:hover:border-neutral-700 file:border-solid",
        DISABLED_STYLES,
        FOCUS_STYLES,
        className,
      ].join(" ")}
      {...otherProps}
    />
  );
}
