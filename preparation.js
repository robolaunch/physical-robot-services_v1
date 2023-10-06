const { exec } = require("child_process");
require("dotenv").config();

const command = `/bin/bash -c ". /opt/ros/${process.env.EXPRESS_APP_ROS_VERSION}/setup.bash"`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`ERROR: ${error}`);
    return;
  }

  console.log(stdout);
});
