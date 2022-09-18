import { redirect } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";

import Field from "~/components/ui/Field";
import { addMeet } from "utils/meet.server";
import Main from "~/components/layout/Main";
import Button from "~/components/ui/Button";
import cuid from "cuid";

export async function action({ request }) {
  const formData = await request.formData();

  const name = formData.get("name");
  const about = formData.get("about");
  const link = formData.get("link");
  const openTiming = formData.get("openTiming");
  const closingTiming = formData.get("closingTiming");

  const slots = {
    startTime: openTiming,
    endTime: closingTiming,
  };

  if (name && link) {
    const slug = name.split(" ").join("-") + "-" + cuid.slug();
    const meet = await addMeet({
      data: { name, slots, slug, about, link },
      request,
    });
    if (!meet) {
      return { error: "something went wrong" };
    }

    return redirect("/meet");
  }

  return { error: "all fields are required" };
}

export default function AddBlog() {
  const data = useActionData();

  return (
    <Main>
      <h1>Add New Meet</h1>
      <Form method="post">
        <Field
          id="name"
          name="name"
          type="text"
          label="Name"
          placeholder="Eg. Hackathon"
        />
        <Field
          id="about"
          name="about"
          type="text"
          label="About"
          placeholder="Eg. A group event"
        />
        <Field
          id="link"
          name="link"
          type="text"
          label="Link"
          placeholder="Eg. zoom or goole meet link"
        />
        <Field
          id="openTiming"
          name="openTiming"
          type="datetime-local"
          label="Slot opening timing"
          onChange={(e) => console.log(e.target.value)}
        />
        <Field
          id="closingTiming"
          name="closingTiming"
          type="datetime-local"
          label="Slot closing timing"
        />
        <Button type="submit">Submit</Button>
      </Form>
      {data?.error && <p>{data?.error}</p>}
    </Main>
  );
}
