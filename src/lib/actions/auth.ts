"use server";

import { db } from "@/database/drizzle";
import { usersTable } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { signIn, signOut } from "../../../auth";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";

const SALT_ROUNDS = 10;

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
): Promise<{ success: boolean; error?: string | undefined }> => {
  const { email, password } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) redirect("/too-fast");

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) return { success: false, error: result.error };

    return { success: true };
  } catch (error: Error | unknown) {
    console.log(
      `Error creating user: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
  return { success: false, error: "Unknown error" };
};

export const signUp = async ({
  fullName,
  email,
  universityCard,
  universityId,
  password,
}: AuthCredentials): Promise<
  { success: boolean; error?: string | undefined } | undefined
> => {
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) redirect("/too-fast");

  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  const hashPassword = await hash(password, SALT_ROUNDS);

  try {
    await db.insert(usersTable).values({
      fullName,
      email,
      universityCard,
      universityId: Number(universityId),
      password: hashPassword,
    });

    await signInWithCredentials({ email, password });

    return { success: true };
  } catch (error: Error | unknown) {
    console.log(
      `Error creating user: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export const logoutUser = async () => {
  await signOut();
};