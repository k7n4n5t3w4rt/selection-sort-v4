// @flow
import { test, testPromise, should } from "../../../server/testy.js";
import indxOfCbWthLwstVl from "./indxOfCbWthLwstVl.js";

const skip = false;

test(
  "indxOfCbWthLwstVl | Returns the index of the cube with the lowest selection value",
  () /*: void */ => {
    const thisCube = {
      position: {
        z: 1,
        x: 0,
        y: 1,
      },
      selection_value: 3,
    };
    const acc1 = indxOfCbWthLwstVl(0)([0, 10], thisCube, 1);
    should(JSON.stringify(acc1)).be.exactly(JSON.stringify([1, 3]));
    const acc2 = indxOfCbWthLwstVl(1)([1, 1], thisCube, 2);
    should(JSON.stringify(acc2)).be.exactly(JSON.stringify([1, 1]));
    const acc3 = indxOfCbWthLwstVl(1)([1, 1], thisCube, 0);
    should(JSON.stringify(acc2)).be.exactly(JSON.stringify([1, 1]));
  },
  skip,
);
