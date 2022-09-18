import { useLoaderData, Form } from "@remix-run/react";
import React from "react";
import { ScheduleMeeting } from "react-schedule-meeting";
import { getMeetBySlug } from "utils/meet.server";
import Main from "~/components/layout/Main";
import Button from "~/components/ui/Button";
import Field from "~/components/ui/Field";
import Textarea from "~/components/ui/Textarea";

export async function loader({ params }) {
  const slug = params.slug;

  const meet = await getMeetBySlug(slug);

  return { meet };
}

export default function Meet() {
  const { meet } = useLoaderData();
  const availableTimeslots = [meet.slots];

  return (
    <Main>
      <Form method="post">
        <Field
          id="name"
          name="name"
          type="text"
          label="Name"
          placeholder="Eg. Hackathon"
        />
        <Field
          id="email"
          name="email"
          type="text"
          label="Email"
          placeholder="Eg. Hackathon"
        />
        <Field
          component={Textarea}
          id="note"
          name="note"
          type="text"
          label="Note"
          placeholder="Eg. Hackathon"
        />
        <ScheduleMeeting
          borderRadius={10}
          primaryColor="#3b82f6"
          eventDurationInMinutes={30}
          availableTimeslots={availableTimeslots}
          onStartTimeSelect={console.log}
        />
        <Button>Submit</Button>
      </Form>
    </Main>
  );
}
