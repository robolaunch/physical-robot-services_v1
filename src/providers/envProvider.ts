import dotenv from "dotenv";

dotenv.config();

export const envRosVersion: string = process.env.EXPRESS_APP_ROS_VERSION! || "";

export const envFolderPath: string = process.env.EXPRESS_APP_FOLDER_PATH! || "";

export const envAppPort: number = parseInt(process.env.EXPRESS_APP_PORT!);

export const envRobotPort: number = parseInt(process.env.ROBOT_PORT!);
