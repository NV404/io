import { useLoaderData, Form } from "@remix-run/react";
import { getMerchs } from "utils/merch.server";
import Header from "~/components/layout/Header";
import Main from "~/components/layout/Main";
import Page from "~/components/layout/Page";
import Button from "~/components/ui/Button";
import { PostCardWrapper } from "~/components/ui/Post";
import Tabs from "~/components/ui/Tabs";

export async function loader({ request }) {
  const merchs = await getMerchs(request);
  return { merchs };
}

export default function Merchs() {
  const { merchs } = useLoaderData();
  return (
    <Main>
      <Tabs
        data={[
          { label: "Top", content: "Blah blah" },
          { label: "Latest", content: "Blah blah blah" },
        ]}
      />
      <div className="flex py-4">
        <Button className="w-full">Add Post</Button>
      </div>
      {merchs.length > 0 ? (
        <PostCardWrapper>
          {merchs.map((merch) => (
            <div key={merch.id}>
              <p>{merch.content}</p>
            </div>
          ))}
        </PostCardWrapper>
      ) : (
        <p>No merchs</p>
      )}
    </Main>
  );
}
