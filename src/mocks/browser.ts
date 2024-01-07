import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// api 요청을 가로채서 mock server로 보내는 역할
const worker = setupWorker(...handlers);

export default worker;
