export const getBubbleSortAnimations = (array) => {
  const animations = [];
  if (array.length <= 1) {
    return array;
  }
  let sorted = false;
  let tempArray = array.slice(0);
  console.log(tempArray);
  let round = 0;

  while (!sorted) {
    sorted = true;
    for (let i = 0; i < array.length - 1 - round; i++) {
      animations.push([i, i + 1]);
      if (array[i] > array[i + 1]) {
        animations.push([i, i + 1, true]);
        let temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        sorted = false;
        animations.push(array.slice(0));
        animations.push([]);
      }
    }
    animations.push([true, array.length-1-round]);
    round++;
  }

  return animations
};
