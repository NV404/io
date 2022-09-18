import { db } from "./db.server";
import { getUserId } from "./session.server";

export async function addMeet({ data, request }) {
  const id = await getUserId(request);
  const meet = await db.user.update({
    data: {
      meets: {
        create: {
          ...data,
        },
      },
    },
    where: {
      id,
    },
  });

  return meet;
}

export async function getMeetBySlug(slug) {
  const meet = await db.meet.findUnique({
    where: {
      slug,
    },
  });
  return meet;
}

export async function getMeets(request) {
  const userID = await getUserId(request);
  const meets = await db.meet.findMany({
      where: {
          userID
      }
  });
  return meets;
}
