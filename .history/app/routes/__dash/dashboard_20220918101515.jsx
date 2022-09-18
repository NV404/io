import { Link } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react/dist";
import { getUser } from "utils/session.server";
import Main from "~/components/layout/Main";
import Anchor from "~/components/ui/Anchor";
import { PostCardWrapper } from "~/components/ui/Post";
import Tabs from "~/components/ui/Tabs";

export default function Dashboard() {
  return (
    <Main>
      <Anchor href="/blogs">Your blogs</Anchor>
      <Anchor href="/spomsers">Your sponsers</Anchor>
      <Anchor href="/merchs">Your merchs</Anchor>
    </Main>
  );
}
