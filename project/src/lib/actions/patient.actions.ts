"use server";

import {
  APPWRITE_PROJECT_ID,
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  account,
  databases,
  storage,
  users,
} from "@/appwrite.config";
import { ID, Models, OAuthProvider, Query } from "node-appwrite";

import { parseStringify } from "../utils";

// Not Related to DB, didn't even made Collection/Table for this, it's related to "Appwrite's own Auth-System"
export async function createUser({
  email,
  name,
  phone,
  password,
}: CreateUserParams & { password: string }) {
  try {
    // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
    const newuser = await users.create(
      ID.unique(),
      email,
      phone,
      password,
      name
    );
    await users.createSession(newuser.$id);
    // const u = await account.create(ID.unique(), email, password, name);
    // await account.createEmailPasswordSession(email, password);
    // await account.createPhoneVerification();

    // const token = await account.createEmailToken(newuser.$id, email);

    return parseStringify({ ...newuser });
  } catch (error: any) {
    console.log(error, " error while login");
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

    // user.emailVerification
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
export async function registerPatient({
  identificationDocument,
  ...patient
}: RegisterUserParams) {
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file;
    if (identificationDocument) {
      // const inputFile =
      //   identificationDocument &&
      //   InputFile.fromBuffer(
      //     identificationDocument?.get("blobFile") as Blob,
      //     identificationDocument?.get("fileName") as string
      //   );
      // file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
      file = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        identificationDocument[0]
      );
    }

    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const fileUrl = `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view??project=${APPWRITE_PROJECT_ID}`;

    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocument: file?.$id ? file?.$id : null,
        identificationDocumentUrl: file?.$id ? fileUrl : null,
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
}

// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};
