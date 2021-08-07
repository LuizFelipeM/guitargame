import { instantiateStreaming } from "assemblyscript/lib/loader";

interface WasmProps extends Record<string, unknown> {
  factorial: (val: number) => number
  scramble: (val: number) => number
}

export default instantiateStreaming<WasmProps>(fetch("./as-api.wasm"))
  .then(({ exports }) => {
    return Object.assign({}, exports, {
      scramble: (input: string) => {
          // Create the string in memory and get the pointer
          // const pInput = rawModule.exports.__retain(rawModule.exports.__allocString(input));
          const pInput = exports.__newString(input);

          // Call the WebAssembly function
          // const pOutput = rawModule.exports.scramble(pInput);
          const pOutput = exports.scramble(pInput);

          // Retrieve the result string
          const result = exports.__getString(pOutput);

          // Free up memory
          // rawModule.exports.__release(pInput);
          // rawModule.exports.__release(pOutput);
          return result;
      }
    })
  });
