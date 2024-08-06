import * as sdk from "node-appwrite";
// export const {
//   APPWRITE_PROJECT_ID,
//   APPWRITE_API_KEY,
//   DATABASE_ID,
//   PATIENT_COLLECTION_ID,
//   DOCTOR_COLLECTION_ID,
//   APPOINTMENT_COLLECTION_ID,
//   NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
//   NEXT_PUBLIC_ENDPOINT: ENDPOINT,
// } = process.export env;
export const APPWRITE_PROJECT_ID = "668f433c0016b309d194";
export const APPWRITE_API_KEY =
  "906c1cf7daf0cd947fb5cfa246894797f71e9afb069fe4b976b0addd49b38e7904d30fd14ecb1ef5b77cedef03cd3175ab312932d4d9619f8c0756cc3cc575928d760f36a1680a258e171f66a7f58e2dee7aa6a5d113eb806343e323dd9a8cb1a7512f34591908cb207ce05a199a0d8f561bfc0ba28ae328377fd69307fb1894";
export const DATABASE_ID = "668f45470013024f383b";
export const PATIENT_COLLECTION_ID = "668f4587001d77b899e0";
export const DOCTOR_COLLECTION_ID = "668f45c3001b1d2fcb0c";
export const ENDPOINT = "https://cloud.appwrite.io/v1";
export const APPOINTMENT_COLLECTION_ID = "668f45f200228db71af2";
export const BUCKET_ID = "668f463c0025777bc532";
export const ADMIN_PASSKEY = "424242";

const client = new sdk.Client();
client
  .setEndpoint(ENDPOINT!)
  .setProject(APPWRITE_PROJECT_ID!)
  .setKey(APPWRITE_API_KEY!);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
export const account = new sdk.Account(client);

// secret for encrypiton and dycription
export const CRYPTO_secretKey = "your-secret-key";

// local-storage-vars
export const LS_userId = "__u__";
