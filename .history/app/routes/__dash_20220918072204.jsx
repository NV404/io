import { redirect } from "@remix-run/node";
import { Outlet, Link, useLocation } from "@remix-run/react";
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
  return (
    <Page>
      <Header isLoggedIn />
      <Container className="mt-8">
        <div className="flex flex-row items-stretch justify-start gap-2">
          <AnchorButton to="/dashboard">Overview</AnchorButton>
          <AnchorButton to="/blogs">Your blogs</AnchorButton>
          <AnchorButton to="/settings">Settings</AnchorButton>
        </div>
      </Container>
      <Outlet />
    </Page>
  );
}
