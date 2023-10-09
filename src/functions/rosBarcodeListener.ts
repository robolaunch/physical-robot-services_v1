import rosClient from "../clients/rosClient";
import axios from "axios";

export default async function rosBarcodeListener() {
  rosClient.createSubscription(
    "std_msgs/msg/String",
    "barcode_scanner",
    async (msg: any) => {
      console.log(`${msg.data}`);

      await axios.post("http://127.0.0.1/barcode", {
        scanner_id: 1,
        barcode: "barcode",
        location_x: 1,
        location_y: 2,
        location_z: 3,
      });
    }
  );
}
