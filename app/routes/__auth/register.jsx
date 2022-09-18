import { useActionData, Link, Form, useTransition } from "@remix-run/react";
import { db } from "utils/db.server";
import Anchor from "~/components/ui/Anchor";
import Button from "~/components/ui/Button";
import Field from "~/components/ui/Field";
import { createUserSession, register } from "../../../utils/session.server";

export async function action({ request }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const slug = formData.get("slug");
  const name = formData.get("name");
  const password = formData.get("password");

  if (email && slug && name && password) {
    const userExists = await db.user.findFirst({
      where: { email },
    });
    if (userExists) {
      return { error: `User with email ${email} already exists` };
    }

    const slugExists = await db.user.findFirst({
      where: { slug },
    });
    if (slugExists) {
      return { error: `${email} is not available` };
    }

    const user = await register({ email, slug, name, password });
    if (!user) {
      return { error: "something went wrong while creating user" };
    }
    return createUserSession(user.id, "/");
  }

  return { error: "all fields are required" };
}

export default function Register() {
  const transition = useTransition();
  const isBusy =
    transition.state === "loading" || transition.state === "submitting";
  const data = useActionData();

  return (
    <Form
      method="POST"
      className="max-w-[min(320px,_100%)] mx-auto flex flex-col items-stretch justify-start gap-6"
    >
      <fieldset className="contents" disabled={isBusy}>
        <h1 className="text-center font-bold text-3xl">Sign Up</h1>
        <div className="flex flex-col items-stretch justify-start gap-2">
          <Field id="name" type="text" name="name" label="Name" />
          <Field id="email" type="email" name="email" label="Email" />
          <Field id="slug" type="text" name="slug" label="Slug" />
          <Field
            id="password"
            type="password"
            name="password"
            label="Password"
          />
        </div>
        <Button type="submit">Create account</Button>
        <p className="text-sm text-center">
          Already user?{" "}
          <Anchor as={Link} to="/login">
            Login
          </Anchor>{" "}
          instead.
        </p>
      </fieldset>
    </Form>
  );
}
