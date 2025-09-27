import { createApiClient } from "./appClient";

const orderClient = createApiClient("http://localhost:8082");

export default orderClient;
