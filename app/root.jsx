import tailwindCSSStylesRef from "./styles/app.css";

const {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} = require("@remix-run/react");

export const meta = () => ({
  charset: "utf-8",
  title: "IO",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    {
      rel: "icon",
      type: "image/svg",
      href: "/logo.svg",
    },

    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap",
    },

    { rel: "stylesheet", href: tailwindCSSStylesRef },
  ];
}

export default function App() {
  return (
    <html
      lang="en"
      className="h-full font-sans selection:bg-white/80 selection:text-black/80"
    >
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-black text-white antialiased">
        <Outlet />
        <ScrollRestoration />
        <script defer src="https://checkout.razorpay.com/v1/checkout.js" />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
