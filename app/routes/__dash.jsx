import { redirect } from "@remix-run/node";
import { Outlet, Link, useLocation, useTransition } from "@remix-run/react";
import { getUserId } from "utils/session.server";
import Container from "~/components/layout/Container";
import Header from "~/components/layout/Header";
import Main from "~/components/layout/Main";
import Page from "~/components/layout/Page";
import Button from "~/components/ui/Button";

export async function loader({ request }) {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect("/login");
  }
  return {};
}

function AnchorButton({ to, children }) {
  const location = useLocation();
  return (
    <Button as={Link} to={to} ghost={location.pathname !== to}>
      {children}
    </Button>
  );
}

export default function Dash() {
  const transition = useTransition();

  return (
    <Page>
      <Header isLoggedIn />
      <Container className="pt-8">
        <fieldset
          className="flex flex-row items-stretch justify-start gap-2"
          disabled={transition.state === "loading"}
        >
          <AnchorButton to="/dashboard">Overview</AnchorButton>
          <AnchorButton to="/blogs">Your blogs</AnchorButton>
          <AnchorButton to="/merchs">Your Merchs</AnchorButton>
          <AnchorButton to="/sponsers">Sponsers</AnchorButton>
          {/* <AnchorButton to="/settings">Settings</AnchorButton> */}
        </fieldset>
      </Container>
      <Outlet />
    </Page>
  );
}
