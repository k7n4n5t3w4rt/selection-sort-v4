// @flow
import { test, testPromise, should } from "../../../server/testy.js";

const indxOfCbWthLwstVl = (currentIndex /*: number */) /*: function */ => (
  acc /*: Array<number> */,
  cube /*: Cube */,
  index /*: number */,
) /*: Array<number> */ => {
  // $FlowFixMe - currentIndex is in the enclosing scope
  if (index > currentIndex && cube.selection_value < acc[1]) {
    return [index, cube.selection_value];
  } else {
    return acc;
  }
};

export default indxOfCbWthLwstVl;
