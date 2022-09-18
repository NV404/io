import { redirect, unstable_parseMultipartFormData } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";

import Field from "~/components/ui/Field";
import { addSponser } from "utils/sponser.server";
import Page from "~/components/layout/Page";
import Main from "~/components/layout/Main";
import Button from "~/components/ui/Button";

import { uploadImage } from "../../../utils/cloudinary";
import FileInput from "~/components/ui/FileInput";

export async function action({ request }) {
  const formData = await unstable_parseMultipartFormData(
    request,
    async function ({ stream, name, filename, ...otherProps }) {
      if (name === "imageURL" && filename) {
        const uploadedImage = await uploadImage(stream);

        return uploadedImage.secure_url;
      }

      stream.resume();
    }
  );

  const content = formData.get("content");
  const URL = formData.get("url");
  const imageURL = formData.get("imageURL");

  if (content && URL) {
    const sponser = await addSponser({
      data: { content, URL, imageURL },
      request,
    });
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
      <Form method="post" encType="multipart/form-data">
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
        <Field
          component={FileInput}
          id="imageURL"
          name="imageURL"
          label="Image"
        />

        <Button type="submit">Submit</Button>
      </Form>
      {data?.error && <p>{data?.error}</p>}
    </Main>
  );
}
