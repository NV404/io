export default function Page({ children, className = "", ...otherProps }) {
  return (
    <div
      className={[
        "w-full min-h-full",
        "flex flex-col items-stretch justify-start",
        className,
      ].join(" ")}
      {...otherProps}
    >
      {children}
    </div>
  );
}
