import { Platform } from "react-native";
import {
  Storage,
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const appWriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  Platform: "com.meet2aman.aora",
  projectId: "6654ea990039d8e8b0c5",
  databaseId: "6654ece1000f43e63cbb",
  userCollectionId: "6654ed04000515116fde",
  videoCollectionId: "6654ed26002d9601954c",
  storageId: "6654ef2c001f643eecb3",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appWriteConfig.endpoint)
  .setProject(appWriteConfig.projectId)
  .setPlatform(appWriteConfig.Platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

///// ----------- Creating a new user Function   ----------------//////

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        password,
        username,
        avatar: avatarUrl,
      }
    );
  } catch (error: any) {
    throw new Error(error);
  }
};

/////----------- Logging in the registered user Function     ----------------//////
export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error: any) {
    throw new Error(error);
  }
}

///// ----------- Getting current user Function     ----------------    //////

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

///// -----------  Getting all posts   ----------------    //////

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt")]
    );
    return posts.documents;
  } catch (error: any) {
    throw Error(error);
  }
};
///// -----------  Getting latest posts   ----------------    //////

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );
    return posts.documents;
  } catch (error: any) {
    throw error.message;
  }
};

///// -----------  Getting searched post  ----------------    //////

export async function searchPosts(query: any) {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error: any) {
    throw error;
  }
}

///// -----------  Getting specific user's post  ----------------    //////

export async function getUserPosts(userId: string) {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId,
      [Query.equal("creator", userId)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error: any) {
    throw error;
  }
}

///// -----------  logout function  ----------------    //////

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error: any) {
    throw error;
  }
};

/*************  Video Handling Handled here  **************/

///// -----------  Create a video function  ----------------    //////

export const createVideo = async (form: any) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);
    const newPost = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );
    return newPost;
  } catch (error: any) {
    throw error;
  }
};

///// -----------  Upload file to bucket and get url  ----------------    //////

export const uploadFile = async (file: any, type: string) => {
  if (!file) return;
  console.log("File", file);
  const asset = {
    name: file.uri.split("/").pop(), // Extract filename from URI
    type: file.type, // Use file type directly from the picker
    size: file.fileSize || 0, // Set a default if fileSize is undefined
    uri: file.uri,
  };
  try {
    const uploadFile = await storage.createFile(
      appWriteConfig.storageId,
      ID.unique(),
      asset
    );
    const fileUrl = await getFilePreview(uploadFile.$id, type);
    console.log(!fileUrl);
    console.log("Fileurl", fileUrl);
    return fileUrl;
  } catch (error: any) {
    throw error;
  }
};

///// -----------  after uploading getting preview  ----------------    //////
export const getFilePreview = async (fileId: string, type: string) => {
  let fileUrl;
  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appWriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appWriteConfig.storageId,
        fileId,
        2000,
        2000,
        //@ts-ignore
        "top",
        100
      );
    } else {
      throw new Error("Inavlid File Type");
    }
    if (!fileUrl) throw Error;
    return fileUrl;
  } catch (error) {
    throw new Error("Function not implemented.");
  }
};
