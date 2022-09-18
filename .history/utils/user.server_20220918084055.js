import { db } from "./db.server";
import { getUserId } from "./session.server";

export async function updateUser({data, request}){
  const id = await getUserId(request);
  delete data.passwordHash
  const user = await db.user.update({
    where: {
      id,
    },
    data
  })

  return user
}

export async function getBlogsBySlug(slug) {
  const user = await db.user.findUnique({
    where: {
      slug,
    },
    include: {
      blogs: {
        include: {
          _count: {
            likes: true,
            comments: true
          },
        },
      }
    }
  });

  delete user.passwordHash;

  return user;
}
