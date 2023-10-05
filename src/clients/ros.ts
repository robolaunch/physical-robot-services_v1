import * as rclnodejs from "rclnodejs";

rclnodejs.init();

const rosClient = new rclnodejs.Node("rcnodejs_client");

rclnodejs.spin(rosClient);

export default rosClient;
