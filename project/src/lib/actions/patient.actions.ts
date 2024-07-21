"use server";

import {
  APPWRITE_PROJECT_ID,
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  databases,
  storage,
  users,
} from "@/appwrite.config";
import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

import { parseStringify } from "../utils";
import { toast } from "sonner";

// Not Related to DB, didn't even made Collection/Table for this, it's related to "Appwrite's own Auth-System"
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
// Not Related to DB, didn't even made Collection/Table for this, it's related to "Appwrite's own Auth-System"
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

// REGISTER PATIENT
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file;
    if (identificationDocument) {
      const inputFile =
        identificationDocument &&
        InputFile.fromBuffer(
          identificationDocument?.get("blobFile") as Blob,
          identificationDocument?.get("fileName") as string
        );

      // file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: "file?.$id" ? "file.$" : null,
        identificationDocumentUrl: "https://shaddu.com",
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};
