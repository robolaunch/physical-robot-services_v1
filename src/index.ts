import rosClient from "./clients/ros";

const listener = rosClient.createSubscription(
  "std_msgs/msg/String",
  "my_topic",
  (msg: any) => {
    console.log(`${msg.data}`);
  }
);
