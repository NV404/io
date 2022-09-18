import Container from "./Container";

export default function Main({ children, className = "", ...otherProps }) {
  return (
    <Container
      as="main"
      className={["py-8", "flex-1", className].join(" ")}
      {...otherProps}
    >
      {children}
    </Container>
  );
}
