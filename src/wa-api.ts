import { instantiateStreaming } from "assemblyscript/lib/loader";

export default instantiateStreaming<{ factorial: (val: number) => number }>(fetch("./as-api.wasm"));
