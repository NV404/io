import { useLoaderData } from "@remix-run/react";
import { getMeets } from "utils/meet.server";
import Main from "~/components/layout/Main";
import Button from "~/components/ui/Button";
import { PostCardWrapper } from "~/components/ui/Post";

export async function loader({ request }) {
  const meets = await getMeets(request);
  return { meets };
}

export default function Meets() {
  const { meets } = useLoaderData();
  return (
    <Main>
      <div className="flex py-4">
        <Button className="w-full">Add Post</Button>
      </div>
      {meets.length > 0 ? (
        <PostCardWrapper>
          {meets.map((meet) => (
            <div key={meet.id}>
              <p>{meet.slug}</p>
            </div>
          ))}
        </PostCardWrapper>
      ) : (
        <p>No meets</p>
      )}
    </Main>
  );
}
