export type IimportTopicList = IimportTopic[];

export type IimportTopic = {
  name: string;
  type: string;
  function: "get" | "post";
};
