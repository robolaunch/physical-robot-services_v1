import * as rclnodejs from "rclnodejs";

const node = new rclnodejs.Node("rclnodejs_client");
const publisher = node.createPublisher("rcl_interfaces/msg/Log", "/rosout");
publisher.publish(Buffer.from(`Hello ROS 2 from rclnodejs`));
node.spin(1000);

const listener = node.createSubscription(
  "rcl_interfaces/msg/Log",
  "rosout",
  (msg: any) => {
    console.log(`I heard: [${msg.data}]`);
  }
);

export default {
  node,
};
