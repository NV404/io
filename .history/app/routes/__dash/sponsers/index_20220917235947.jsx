import { useLoaderData } from "@remix-run/react";
import { getSponsers } from "utils/sponser.server";
import Header from "~/components/layout/Header";
import Main from "~/components/layout/Main";
import Page from "~/components/layout/Page";
import Button from "~/components/ui/Button";
import { PostCardWrapper } from "~/components/ui/Post";
import Tabs from "~/components/ui/Tabs";

export async function loader({ request }) {
  const sponsers = await getSponsers(request);
  return { sponsers };
}

export default function Sponsers() {
  const { sponsers } = useLoaderData();
  return (
    <Page>
      <Header />
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
        {sponsers.length > 0 ? (
          <PostCardWrapper>
            {sponsers.map((sponser) => (
              <div key={sponser.id}>
                <p>{sponser.content}</p>
              </div>
            ))}
          </PostCardWrapper>
        ) : (
          <p>No sponsers</p>
        )}
      </Main>
    </Page>
  );
}
