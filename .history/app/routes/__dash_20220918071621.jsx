import { redirect } from "@remix-run/node";
import { Outlet, Link, useLocation } from "@remix-run/react";
import { getUserId } from "utils/session.server";
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
  console.log(location);
  return (
    <Button as={Link} to={to}>
      {children}
    </Button>
  );
}

export default function Dash() {
  return (
    <Page>
      <Header isLoggedIn />
      <Main>
        <AnchorButton to="/dashboard">Overview</AnchorButton>
        <AnchorButton to="/blogs">Your blogs</AnchorButton>
        <AnchorButton to="/settings">Settings</AnchorButton>
      </Main>
      <Outlet />
    </Page>
  );
}
