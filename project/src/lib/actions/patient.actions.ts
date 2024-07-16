"use server";

import { users } from "@/appwrite.config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { toast } from "sonner";

export async function createUser({ email, name, phone }: CreateUserParams) {
  try {
    // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
    const newuser = await users.create(
      ID.unique(),
      email,
      phone,
      undefined,
      name
    );

    return parseStringify(newuser);
  } catch (error: any) {
    // Check existing user
    if (error && error?.code === 409) {
      const existingUser = await users.list([Query.equal("email", [email])]);

      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
}

// GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    // toast.error("Something Went Wrong!");
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};
