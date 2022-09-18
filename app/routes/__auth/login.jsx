import { Form, Link, useTransition } from "@remix-run/react";
import Anchor from "~/components/ui/Anchor";
import Button from "~/components/ui/Button";
import Field from "~/components/ui/Field";
import { createUserSession, login } from "../../../utils/session.server";

export async function action({ request }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  if (email && password) {
    const user = await login({ email, password });
    console.log({ user });
    if (!user) {
      return { error: "Incorrect email or password" };
    }
    return createUserSession(user.id, "/");
  }

  return { error: "all fields are required" };
}

export default function Login() {
  const transition = useTransition();
  const isBusy =
    transition.state === "loading" || transition.state === "submitting";

  return (
    <Form
      method="POST"
      className="max-w-[min(320px,_100%)] mx-auto flex flex-col items-stretch justify-start gap-6"
    >
      <fieldset className="contents" disabled={isBusy}>
        <h1 className="text-center font-bold text-3xl">Login</h1>
        <div className="flex flex-col items-stretch justify-start gap-2">
          <Field id="email" type="email" name="email" label="Email" />
          <Field
            id="password"
            type="password"
            name="password"
            label="Password"
          />
        </div>
        <Button type="submit">Authenticate</Button>
        <p className="text-sm text-center">
          <Anchor as={Link} to="/register">
            Sign up
          </Anchor>{" "}
          instead?
        </p>
      </fieldset>
    </Form>
  );
}
