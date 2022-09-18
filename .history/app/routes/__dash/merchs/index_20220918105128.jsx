import { useLoaderData, Form, Link } from "@remix-run/react";
import { getMerchs } from "utils/merch.server";
import Header from "~/components/layout/Header";
import Main from "~/components/layout/Main";
import Page from "~/components/layout/Page";
import Button from "~/components/ui/Button";
import { PostCard, PostCardWrapper } from "~/components/ui/Post";
import Tabs from "~/components/ui/Tabs";

export async function loader({ request }) {
  const merchs = await getMerchs(request);
  return { merchs };
}

export default function Merchs() {
  const { merchs } = useLoaderData();
  return (
    <Main>
      <div className="flex py-4">
        <Button as={Link} to="add" className="w-full">
          Add Merch
        </Button>
      </div>
      {merchs.length > 0 ? (
        <PostCardWrapper>
          {merchs.map((merch) => (
            <PostCard
              key={merch.id}
              className={[
                "flex flex-col items-stretch justify-start rounded-xl gap-2 bg-white/5",
              ].join(" ")}
            >
              <p>{merch.content}</p>
              <p className="text-sm text-neutral-400">{merch.createdAt}</p>
            </PostCard>
          ))}
        </PostCardWrapper>
      ) : (
        <p>No merchs</p>
      )}
    </Main>
  );
}
