import { db } from "./db.server";
import { getUserId } from "./session.server";

export async function addblog({ data, id }) {
  const blog = await db.user.update({
    data: {
      blogs: {
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

export async function getBlogs() {
  const blog = await db.blog.findMany({
    include: {
      tags: true,
      _count: {
        select: {
          likes: true,
          comments: true
        }
      }
    }
  });
  return blog;
}

export async function getblog(slug) {
  const blog = await db.blog.findUnique({
    where: {
      slug: slug,
    },
    include: {
      user: true,
      likes: true,
      comments: true,
    },
  });

  delete blog.user.passwordHash

  return blog;
}

export async function getUserblogs(id) {
  const blog = await db.blog.findMany({
    where: {
      userId: id,
    },
  });

  return blog;
}

export async function likeBlog({ id, request }) {
  const userID = await getUserId(request);

  const blog = await db.like.create({
    data: {
      blogID: id,
      userID,
    },
  });

  return blog;
}

export async function removeLike({ id, request }) {
  const userID = await getUserId(request);

  const blog = await db.blog.findUnique({
    where: {
      id,
    },
    include: {
      likes: true,
    },
  });

  const likeID = blog.likes.find((x) => x.userID === userID);

  const like = await db.like.delete({
    where: {
      id: likeID.id,
    },
  });

  return like;
}

export async function addComment({ id, comment, request }) {
  const userID = await getUserId(request);

  const blog = await db.comment.create({
    data: {
      content: comment,
      blogID: id,
      userID,
    },
  });

  return blog;
}
