import { db } from "./db.server";
import { getUserId } from "./session.server";

export async function addMerch({ data, request }) {
    const id = await getUserId(request);
    const blog = await db.user.update({
      data: {
        merchs: {
          create: {
            ...data
          }
        },
      },
      where: {
        id,
      }
    });
  
    return blog;
  }

  export async function getMerchs(request) {
    const userID = await getUserId(request);
    const merchs = await db.merch.findMany({
        where: {
            userID
        }
    });
    return merchs;
  }