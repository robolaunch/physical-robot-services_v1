import { get } from "http";
import rosTopicPublisher from "../functions/rosTopicPublisher";
import getTopicList from "../data/getTopicList";

export default function test() {
  getTopicList()
    .filter((topic: any) => topic.function === "get")
    .map((topic: any) => {
      rosTopicPublisher({
        name: topic.name,
        type: topic.type,
        message: `Test message for ${topic.name}`,
        interval: 10000,
      });
    });
}
