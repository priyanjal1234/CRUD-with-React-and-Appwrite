import conf from "../config/conf";
import { Client, Databases,ID } from "appwrite";

class UserService {
    constructor() {
        this.client = new Client()
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
    }

    async createUser({name,email,password}) {
        try {
            let user = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUsersCollectionId,
                ID.unique(),
                {
                    name,
                    email,
                    password
                }
            )
            return user
        } catch (error) {
            throw error
        }
    }

    async getAllUsers() {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteUsersCollectionId
            )
        } catch (error) {
            throw error
        }
    }

    async deleteUser(id) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUsersCollectionId,
                id
            )
        } catch (error) {
            throw error
        }
    }
}

let userService = new UserService()

export default userService