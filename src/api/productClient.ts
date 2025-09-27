import { createApiClient } from "./appClient";

const productClient = createApiClient("http://localhost:8081/products");

export default productClient;
