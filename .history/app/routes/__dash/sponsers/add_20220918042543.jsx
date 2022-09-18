import { redirect } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";

import Field from "~/components/ui/Field";
import { addSponser } from "utils/sponser.server";
import Page from "~/components/layout/Page";
import Main from "~/components/layout/Main";
import Button from "~/components/ui/Button";

export async function action({ request }) {
  const formData = await request.formData();

  const content = formData.get("content");
  const URL = formData.get("url");

  if (content && URL) {
    const sponser = await addSponser({ data: { content, URL }, request });
    if (!sponser) {
      return { error: "something went wrong" };
    }

    return redirect("/sponsers");
  }

  return { error: "all fields are required" };
}

export default function AddBlog() {
  const data = useActionData();

  return (
    <Main>
      <h1>Add Sponser</h1>
      <Form method="post">
        <Field
          id="content"
          name="content"
          type="text"
          label="Content"
          placeholder="Eg. Kya aapke toothpaste m namak h?"
        />
        <Field
          id="url"
          name="url"
          type="text"
          label="URL"
          placeholder="Eg. example.com"
        />
        <Button type="submit">Submit</Button>
      </Form>
      {data?.error && <p>{data?.error}</p>}
    </Main>
  );
}
