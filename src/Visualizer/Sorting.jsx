import React from "react";
import "./Sorting.css";
import { getMergeSortAnimations } from "../Algorithms/mergeSortAlgorithm";

// Change this value for the number of bars (value) in the array.
const PRIMARY_COLOR = "turquoise";
const SECONDARY_COLOR = "red";
const HEIGHT_FACTOR = 3.8;

class Sorting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      algorithm: "",
      speed: 1,
      size: 100,
    };
  }

  speeds = [0.25, 0.5, 1, 2, 4, 8];
  sizes = [50, 75, 100, 125, 150, 175, 200];
  sortingAlgos = ["Bubble Sort", "Quick Sort", "Merge Sort", "Heap Sort"];

  componentDidMount() {
    this.algorithm = "Bubble Sort";
    this.speed = 1;
    this.size = 100;
    this.resetSizeOfArray(this.size);
  }

  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  resetSizeOfArray(size) {
    const array = [];
    let index = 0;
    while (index < size) {
      array.push(randomIntWithinInterval(10, 100));
      index++;
    }
    this.setState({ array });
  }

  async mergeSort() {
    let bars = document.getElementsByClassName("array-cell");
    const animations = getMergeSortAnimations(this.state.array);
    console.log("Animation Array Completed");
    for (let i = 0; i < animations.length; i++) {
      const bars = document.getElementsByClassName("array-cell");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = bars[barOneIdx].style;
        const barTwoStyle = bars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        await this.sleep(this.speed);
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      } else {
        await this.sleep(this.speed);
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = bars[barOneIdx].style;
        barOneStyle.height = `${3.8 * newHeight}px`;
      }
    }
    console.log("YOO, ");
    for (let i = 0; i < this.state.array.length; i++) {
      bars[i].style.backgroundColor = "#d6d6d6";
    }
  }

  async swap(items, leftIndex, rightIndex, bars) {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
    bars[leftIndex].style.height = items[leftIndex] * HEIGHT_FACTOR + "px";
    bars[leftIndex].style.backgroundColor = "#50c5b7";
    bars[rightIndex].style.height = items[rightIndex] * HEIGHT_FACTOR + "px";
    bars[rightIndex].style.backgroundColor = "#50c5b7";
    await this.sleep(this.speed);
  }

  async partition(items, left, right) {
    let bars = document.getElementsByClassName("array-cell");
    let pivotIndex = Math.floor((right + left) / 2);
    var pivot = items[pivotIndex]; //middle element
    bars[pivotIndex].style.backgroundColor = "#E97451";

    for (let i = 0; i < bars.length; i++) {
      if (i !== pivotIndex) {
        bars[i].style.backgroundColor = "#9cec5b";
      }
    }
    let i = left; //left pointer
    let j = right; //right pointer
    while (i <= j) {
      while (items[i] < pivot) {
        i++;
      }
      while (items[j] > pivot) {
        j--;
      }
      if (i <= j) {
        await this.swap(items, i, j, bars); //sawpping two elements
        i++;
        j--;
      }
    }
    return i;
  }

  async quickSort(items, left, right) {
    var index;
    let bars = document.getElementsByClassName("array-cell");
    if (items.length > 1) {
      index = await this.partition(items, left, right); //index returned from partition
      if (left < index - 1) {
        //more elements on the left side of the pivot
        await this.quickSort(items, left, index - 1);
      }
      if (index < right) {
        //more elements on the right side of the pivot
        await this.quickSort(items, index, right);
      }
    }

    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = "#d6d6d6";
    }
    return items;
  }

  async heapSort(array) {
  let bars = document.getElementsByClassName("array-cell");
  for (let i = Math.floor(array.length / 2); i >= 0; i--) {
    await this.heapify(array, array.length, i);
  }
  for (let i = array.length - 1; i >= 0; i--) {
    await this.swap(array, 0, i, bars);
    await this.heapify(array, i, 0);
  }
  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "#d6d6d6";
    await this.sleep(this.speed);
  }
  return array;
}

async heapify(array, n, i) {
  let bars = document.getElementsByClassName("array-cell");
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  if (left < n && array[left] > array[largest]) {
    largest = left;
  }
  if (right < n && array[right] > array[largest]) {
    largest = right;
  }
  if (largest !== i) {
    await this.swap(array, i, largest, bars);
    await this.heapify(array, n, largest);
  }
}

  async bubbleSort(array) {
    let bars = document.getElementsByClassName("array-cell");
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          for (let k = 0; k < bars.length; k++) {
            if (k !== j && k !== j + 1) {
              bars[k].style.backgroundColor = "#B1D8B7";
            }
          }
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          bars[j].style.height = `${3.8 * array[j]}px`;
          bars[j].style.backgroundColor = "#2F5233";
          bars[j + 1].style.height = `${3.8 * array[j + 1]}px`;
          bars[j + 1].style.backgroundColor = "#2F5233";
          await this.sleep(this.speed);
        }
      }
      await this.sleep(this.speed);
    }
    for (let i = 0; i < array.length; i++) {
      bars[i].style.backgroundColor = "#d6d6d6";
    }
  }

  testSortingAlgorithms() {
    for (let i = 0; i < 50; i++) {
      const array = [];
      const lengthOfArray = randomIntWithinInterval(1, 499);
      for (let i = 0; i < lengthOfArray; i++) {
        array.push(randomIntWithinInterval(-999, 999));
      }

      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(checkArraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  chooseAlgorithm = (e) => {
    this.setState({ algorithm: e.target.value });
    this.algorithm = e.target.value;
  };

  chooseSpeed = (e) => {
    this.setState({ speed: e.target.value });
    this.speed = e.target.value;
  };

  chooseSize = (e) => {
    this.setState({ size: e.target.value });
    this.size = e.target.value;
    this.resetSizeOfArray(e.target.value);
  };

  sortBars = () => {
    switch (this.state.algorithm) {
      case "Merge Sort":
        this.mergeSort();
        break;
      case "Heap Sort":
        this.heapSort(this.state.array);
        break;
      case "Bubble Sort":
        this.bubbleSort(this.state.array);
        break;
      case "Quick Sort":
        this.quickSort(this.state.array, 0, this.state.array.length - 1);
        break;
      default:
        this.bubbleSort(this.state.array);
    }
  };

  render() {
    const { array, algorithm, speed, size } = this.state;
    return (
      <div className="container">
        <div className="nav-container">
          <h2 className="title">Sorting Visualizer</h2>
          <div className="navbar" id="navbar">
            <button id="random" onClick={() => this.resetSizeOfArray(size)}>
              Generate New Array
            </button>
            <span className="options">
              <select
                name="select sort algorithm"
                className="menu"
                id="algo-menu"
                value={algorithm}
                onChange={this.chooseAlgorithm}
              >
                {this.sortingAlgos.map((value, index) => (
                  <option value={value} key={index}>
                    {value}
                  </option>
                ))}
              </select>
            </span>
            <span className="options">
              <select
                name="select array size"
                className="menu"
                id="size-menu"
                value={size}
                onChange={this.chooseSize}
              >
                {this.sizes.map((value, index) => (
                  <option value={value} key={index}>
                    {value}
                  </option>
                ))}
              </select>
            </span>
            <span className="options">
              <select
                name="speed of visualization"
                className="menu"
                id="speed-menu"
                value={speed}
                onChange={this.chooseSpeed}
              >
                {this.speeds.map((value, index) => (
                  <option value={value} key={index}>
                    {value}x
                  </option>
                ))}
              </select>
            </span>
            <button className="start" onClick={() => this.sortBars()}>
              Sort
            </button>
          </div>
        </div>
        <div className="array-container">
          {array.map((value, index) => (
            <div
              className="array-cell"
              key={index}
              value={value}
              style={{
                height: `${3.8 * value}px`,
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

function randomIntWithinInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkArraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) {
    return false;
  }
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}

export default Sorting;
