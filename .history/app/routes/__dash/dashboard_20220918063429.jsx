import { Link } from "@remix-run/react";
import Main from "~/components/layout/Main";
import Anchor from "~/components/ui/Anchor";
import { PostCardWrapper } from "~/components/ui/Post";
import Tabs from "~/components/ui/Tabs";

export default function Dashboard() {
  return (
    <Main>
      <Anchor href="/dashboard">Your blogs</Anchor>
    </Main>
  );
}
