
export const getMergeSortAnimations = (array) => {
  const animations = [];
  if (array.length <= 1) {
    return array;
  }
  const tempArray = array.slice();

  mergeSortHelper(array, tempArray, 0, array.length - 1, animations);
  return animations;
};

const mergeSortHelper = (mainArray, tempArray, start, end, animations) => {
  if (start === end) {
    return;
  }
  const middle = Math.floor((start + end) / 2);
  mergeSortHelper(tempArray, mainArray, start, middle, animations);
  mergeSortHelper(tempArray, mainArray, middle + 1, end, animations);
  doMerge(mainArray, start, middle, end, tempArray, animations);
};

const doMerge = (
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  tempArray,
  animations
) => {
  let i = startIdx;
  let j = middleIdx+1;
  let k = startIdx;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (tempArray[i] <= tempArray[j]) {
        animations.push([k, tempArray[i]]);
        mainArray[k++] = tempArray[i++];
    } else {
        animations.push([k, tempArray[j]]);
        mainArray[k++] = tempArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, tempArray[i]]);
    mainArray[k++] = tempArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, tempArray[j]]);
    mainArray[k++] = tempArray[j++];
  }

};
