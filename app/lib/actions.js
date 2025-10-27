"use server"
import {user} from "./schema"
import { eq, sql, ilike, or, desc } from "drizzle-orm";
import { students } from "./schema";
import { db } from "./drizzle";
import { revalidatePath } from "next/cache";

export async function addClerkUserToDb(clerkUserId,name) {
      try {
        await db.insert(user)
          .values({
            id: clerkUserId,
            name: name,
          })
          .onConflictDoNothing({ target: user.id }); // Prevents insertion if user with this ID already exists
      } catch (error) {
        // console.error('Error adding Clerk user to DB:', error);
        throw error;
      }
    }
export async function updateUserLike(clerkUserId, like) {
  try {
    const result = await db
      .update(user)
      .set({ liked: like })
      .where(eq(user.id, clerkUserId))
      .returning(); // 👈 returns the updated row for confirmation
    return 1;
  } catch (error) {
    throw error;
    return -1;
  }
}
export async function getUserLiked(clerkUserId){
  let likedArr = await db.select({liked: user.liked}).from(user).where(eq(user.id,clerkUserId))
  return likedArr
}

