import { db } from "./db.server";
import { getUserId } from "./session.server";

export async function addSponser({ data, request }) {
    const id = await getUserId(request);
    const blog = await db.user.update({
      data: {
        sponsers: {
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

  export async function getSponsers(request) {
    const userID = await getUserId(request);
    const sponsers = await db.sponser.findMany({
        where: {
            userID
        }
    });
    return sponsers;
  }

  export async function getSponsersByAuthor(authorID) {
    const sponsers = await db.sponser.findMany({
        where: {
            id: authorID
        }
    });
    return sponsers;
  }