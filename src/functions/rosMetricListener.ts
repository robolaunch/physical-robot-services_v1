import rosClient from "../clients/rosClient";
import getTopicList from "../functions/getTopicList";

export default function rosMetricListener() {
  getTopicList().map((topic: any) => {
    rosClient.createSubscription(topic.type, topic.name, (msg: any) => {
      console.log(`${msg.data}`);
    });
  });
}
