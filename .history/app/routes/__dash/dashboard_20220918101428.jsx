import { Link } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react/dist";
import { getUser } from "utils/session.server";
import Main from "~/components/layout/Main";
import Anchor from "~/components/ui/Anchor";
import { PostCardWrapper } from "~/components/ui/Post";
import Tabs from "~/components/ui/Tabs";

export default function Dashboard() {
  const { user } = useLoaderData();

  return (
    <Main>
      <div>
        <p>You Balance: {user.balance}</p>
      </div>
      <Anchor href="/dashboard">Your blogs</Anchor>
    </Main>
  );
}
