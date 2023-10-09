import dotenv from "dotenv";

dotenv.config();

export const envRosVersion: string = process.env.EXPRESS_APP_ROS_VERSION! || "";

export const envFolderPath: string = process.env.EXPRESS_APP_FOLDER_PATH! || "";

export const envPort: number = parseInt(process.env.APPLICATION_PORT!) || 0;
