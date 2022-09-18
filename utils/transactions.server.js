import { db } from "./db.server";
import { getUserId } from "./session.server";

export async function sendTip( paidTo, amount, request ) {
    const id = await getUserId(request)
    const blog = await db.user.update({
      data: {
        receivedTransaction: {
          create: {
            paidTo,
            amount,
          }
        },
      },
      where: {
        id,
      }
    });
  
    return blog;
  }