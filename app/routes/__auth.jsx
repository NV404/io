import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { getUserId } from "utils/session.server";
import Header from "~/components/layout/Header";
import Main from "~/components/layout/Main";
import Page from "~/components/layout/Page";

export async function loader({ request }) {
  const userId = await getUserId(request);
  if (userId) {
    return redirect("/");
  }
  return {};
}

export default function Auth() {
  return (
    <Page>
      <Header />

      <Main className="">
        <Outlet />
      </Main>
    </Page>
  );
}
