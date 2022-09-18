import { Link, useLoaderData } from "@remix-run/react";
import { getSponsers } from "utils/sponser.server";
import Header from "~/components/layout/Header";
import Main from "~/components/layout/Main";
import Page from "~/components/layout/Page";
import Button from "~/components/ui/Button";
import { PostCard, PostCardWrapper } from "~/components/ui/Post";
import Tabs from "~/components/ui/Tabs";

export async function loader({ request }) {
  const sponsers = await getSponsers(request);
  return { sponsers };
}

export default function Sponsers() {
  const { sponsers } = useLoaderData();
  return (
    <Main>
      <div className="flex py-4">
        <Button as={Link} to="add" className="w-full">
          Add Sponser
        </Button>
      </div>
      {sponsers.length > 0 ? (
        <PostCardWrapper>
          {sponsers.map((sponser) => (
            <PostCard
              key={sponser.id}
              className={[
                "flex flex-col items-stretch justify-start rounded-xl gap-2 bg-white/5",
              ].join(" ")}
            >
              <p>{sponser.about}</p>
              <p className="text-sm text-neutral-400">{sponser.createdAt}</p>
            </PostCard>
          ))}
        </PostCardWrapper>
      ) : (
        <p>No sponsers</p>
      )}
    </Main>
  );
}
