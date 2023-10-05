import { IimportTopicList } from "../types/types";

export default function getTopicList(): IimportTopicList {
  const mockData: IimportTopicList = [
    {
      name: "topic1",
      type: "std_msgs/msg/String",
      function: "get",
    },
    {
      name: "topic2",
      type: "std_msgs/msg/String",
      function: "post",
    },
    {
      name: "topic3",
      type: "std_msgs/msg/String",
      function: "get",
    },
  ];

  return mockData;
}
