import * as rclnodejs from "rclnodejs";

rclnodejs.init().then(() => {
  const node = new rclnodejs.Node("rcnodejs_client");

  const param0 = new rclnodejs.Parameter(
    "ROS_LOCALHOST_ONLY",
    rclnodejs.ParameterType.PARAMETER_BOOL,
    true
  );

  const param1 = new rclnodejs.Parameter(
    "ROS_AUTOMATIC_DISCOVERY_RANGE",
    rclnodejs.ParameterType.PARAMETER_STRING_ARRAY,
    ["192.168.0.0/16"]
  );

  const param2 = new rclnodejs.Parameter(
    "ROS_STATIC_PEERS",
    rclnodejs.ParameterType.PARAMETER_STRING_ARRAY,
    ["192.168.0.100"]
  );

  node.declareParameter(param0);

  node.declareParameter(param1);

  node.declareParameter(param2);

  const listener = node.createSubscription(
    "std_msgs/msg/String",
    "my_topic",
    function (msg: any) {
      console.log(`I heard: [${msg.data}]`);
    }
  );
});
