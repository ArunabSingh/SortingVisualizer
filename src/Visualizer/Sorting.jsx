import React from "react";
import "./Sorting.css";
import {getMergeSortAnimations} from "../Algorithms/mergeSortAlgorithm";

// Change this value for the number of bars (value) in the array.
const TOTAL_BARS_IN_ARRAY = 200;
const ANIMATION_SPEED_MS = 5;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

class Sorting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    let index = 0;
    while (index < TOTAL_BARS_IN_ARRAY) {
      array.push(randomIntWithinInterval(10, 100));
      index++;
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    console.log("Animation Array Completed")
    for (let i = 0; i < animations.length; i++) {
      const bars = document.getElementsByClassName("array-cell");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = bars[barOneIdx].style;
        const barTwoStyle = bars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = bars[barOneIdx].style;
          barOneStyle.height = `${3.8 * newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
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

  render() {
    const { array } = this.state;
    return (
      <div className="container">
        <div className="nav-container">
          <h2 className="title">Sorting Visualizer</h2>
          <div className="navbar" id="navbar">
            <button id="random" onClick={() => this.resetArray()}>
              Generate New Array
            </button>
            <button onClick={() => this.mergeSort()}>Merge Sort</button>
            <span className="options">
              <select
                name="select sort algorithm"
                className="menu"
                id="algo-menu"
              >
                <option value="0">Choose algorithm</option>
                <option value="1">Bubble Sort</option>
                <option value="2">Selection Sort</option>
                <option value="3">Insertion Sort</option>
                <option value="4">Merge Sort</option>
                <option value="5">Quick Sort</option>
              </select>
            </span>
            <span className="options">
              <select name="select array size" className="menu" id="size-menu">
                <option value="0">Array size</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="60">60</option>
                <option value="70">70</option>
                <option value="80">80</option>
                <option value="90">90</option>
                <option value="100">100</option>
              </select>
            </span>
            <span className="options">
              <select
                name="speed of visualization"
                className="menu"
                id="speed-menu"
              >
                <option value="0">Speed</option>
                <option value="0.5">0.50x</option>
                <option value="0.75">0.75x</option>
                <option value="1">1.00x</option>
                <option value="2">2.00x</option>
                <option value="4">4.00x</option>
              </select>
            </span>
            <button className="start">Sort</button>
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
