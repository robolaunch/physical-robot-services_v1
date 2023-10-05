import rosClient from "../clients/rosClient";
import getTopicList from "../data/getTopicList";

export default function rosMetricListener() {
  getTopicList()
    .filter((topic: any) => topic.function === "get")
    .map((topic: any) => {
      rosClient.createSubscription(topic.type, topic.name, (msg: any) => {
        console.log(`${msg.data}`);
      });
    });
}
