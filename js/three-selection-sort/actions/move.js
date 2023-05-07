// @flow
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import cube1AnimeOptions from "./cube1AnimeOptions.js";
import cube2AnimeOptions from "./cube2AnimeOptions.js";

const move = (
  cubes /*: Cubes */,
  speed /*: number */,
  scaleZ /*: number */,
  anime /*: function */,
) /*: Cubes */ => {
  // NOTE:
  // This might not be very clear so:
  //
  // cubes is an an array of columns of cubes.
  // Each cube object is a REFERENCE to a THREE.js Mesh object that
  // was atached to the THREE.js scene in:
  //
  //		/js/three-selection-sort/actions/pixelGrid.js (Line 34)
  //
  let movingCube1 /*: boolean */ = true;
  let movingCube2 /*: boolean */ = true;
  const currentIndex /*: number */ = cubes.currentIndex;
  const nextIndex = currentIndex + 1;
  const indexOfItemWLowestSelectionValue = cubes.pixelGrid.reduce(
    (acc, cube, index) => {
      if (index > currentIndex) {
        if (cube.selection_value < acc[1]) {
          return [index, cube.selection_value];
        } else {
          return acc;
        }
      } else {
        return acc;
      }
    },
    [currentIndex, cubes.pixelGrid[currentIndex].selection_value],
  )[0];
  const cube1 = cubes.pixelGrid[currentIndex];
  const cube2 = cubes.pixelGrid[indexOfItemWLowestSelectionValue];

  if (cubes.moving === false) {
    // Check if we are actually at the end of the array of cubes
    // and set cubes to not be active so as to stop
    // the animation in render()
    if (cube2 === undefined) {
      cubes.active === false;
      cubes.currentIndex = 0;
      return cubes;
    }
    // console.log(`Trying cubes[${currentIndex}] and cubes[${nextIndex}]...`);

    // console.log(
    //   `Comparing cubes[${currentIndex}] selection value (${cube1.selection_value}) with  cubes[${nextIndex}] selection value (${cube2.selection_value})`,
    // );

    if (cube1.selection_value > cube2.selection_value) {
      //   console.log(
      //     `cubes[${currentIndex}] selection value (${cube1.selection_value}) > cubes[${nextIndex}] selection value (${cube2.selection_value})`,
      //   );

      //   console.log(`cubes.moving === `, cubes.moving);
      if (cubes.moving === false) {
        // console.log(
        //   `Preparing to swap cubes[${currentIndex}]and cubes[${nextIndex}]...`,
        // );

        const cube1StartPos = {
          z: cube1.position.z,
          y: cube1.position.y,
        };
        // This will cause all calls to move() to have no effect... until
        // the move has finished and cubes.moving is set back to false
        cubes.moving = true;

        // Move cube1
        anime({
          targets: [cube1.position],
          x: [
            {
              value: cube1.position.x - 2 * scaleZ,
              duration: 1000 / speed / 2,
              delay: 0,
            },
            {
              value: cube1.position.x,
              duration: 1000 / speed,
              delay: 0,
            },
          ],
          z: [
            {
              value: cube2.position.z,
              duration: 1000 / speed,
              delay: 0,
            },
          ],
          y: [
            {
              value: cube2.position.y,
              duration: 1000 / speed,
              delay: 0,
            },
          ],
          delay: 500,
          easing: "easeInOutCirc",
          complete: function (anim) {
            // Move cube1
            movingCube1 = false;
            if (movingCube2 === false) {
              cubes.moving = false;
              cubes.currentIndex = nextIndex;
              cubes.pixelGrid[currentIndex] = cube2;
              cubes.pixelGrid[nextIndex] = cube1;
              return cubes;
            }
          },
        });
        anime({
          targets: [cube2.position],
          x: [
            {
              value: cube2.position.x + 2 * scaleZ,
              duration: 1000 / speed / 2,
              delay: 0,
            },
            {
              value: cube2.position.x,
              duration: 1000 / speed,
              delay: 0,
            },
          ],
          z: [{ value: cube1StartPos.z, duration: 1000 / speed, delay: 0 }],
          y: [{ value: cube1StartPos.y, duration: 1000 / speed, delay: 0 }],
          delay: 500,
          easing: "easeInOutCirc",
          complete: function (anim) {
            // Move cube2
            movingCube2 = false;
            if (movingCube1 === false) {
              cubes.moving = false;
              cubes.currentIndex = nextIndex;
              cubes.pixelGrid[currentIndex] = cube2;
              cubes.pixelGrid[indexOfItemWLowestSelectionValue] = cube1;
              return cubes;
            }
          },
        });
      }
    } else {
      cubes.currentIndex = nextIndex;
    }
  }
  return cubes;
};

export default move;
