export default function Container({
  as: As = "div",
  children,
  className = "",
  ...otherProps
}) {
  return (
    <As
      className={["w-[min(720px,_100%)] mx-auto px-4", className].join(" ")}
      {...otherProps}
    >
      {children}
    </As>
  );
}
