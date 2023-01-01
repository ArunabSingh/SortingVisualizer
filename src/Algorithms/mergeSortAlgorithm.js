import Helper from "../HelperFunctions/Helper";

export const mergeSort = array => {
    
    if (array.length === 1) {
        return array;
    }

    const middle = Math.floor(array.length/2) ;
    const left = mergeSort(array.slice(0, middle));
    const right = mergeSort(array.slice(middle))
    const sortedArray = []; 
    merge(left, right, sortedArray);

    return sortedArray;
}
 
const merge = (leftArray, rightArray, sortedArray) => {
    let i = 0;
    let j = 0;
    while ((i < leftArray.length) && (j < rightArray.length)) {
        if (leftArray[i] <= rightArray[j]) {
            sortedArray.push(leftArray[i++]);
        } else {
            sortedArray.push(rightArray[j++]);
        }
    }
    while (i < leftArray.length) {
        sortedArray.push(leftArray[i++]);
    }
    while (j < rightArray.length) {
        sortedArray.push(rightArray[j++]);
    }

    return sortedArray;
}