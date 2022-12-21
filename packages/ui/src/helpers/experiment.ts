import * as tf from '@tensorflow/tfjs-core';
import * as blazeface from '@tensorflow-models/blazeface';
import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';

export default () => {
  console.log(
    tf.ready(),
    tf.setBackend('experiment'),
    blazeface.load({}),
    tfjsWasm.setWasmPaths('experiment')
  );
};
