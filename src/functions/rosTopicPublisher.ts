import rosClient from "../clients/rosClient";

export default function ({ name, type, message, interval }: any) {
  interval ? setInterval(() => publisher(), interval) : publisher();

  function publisher() {
    rosClient.createPublisher(type, name).publish(message);
  }
}
