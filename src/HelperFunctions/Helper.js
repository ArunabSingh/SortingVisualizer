import React from "react";

class Helper extends React.Component {
    constructor(time, list = []) {
        this.time = parseInt(400/1);
        this.list = list;
    }

    mark = async (index) => {
        this.list[index].setAttribute("class", "array-cell current");
    }

    markSpl = async (index) => {
        this.list[index].setAttribute("class", "array-cell min");
    }

    unmark = async (index) => {
        this.list[index].setAttribute("class", "array-cell");
    }

    pause = async() => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }


    compare = async(firstIndex, secondIndex) => {
        await this.pause();
        let firstValue = Number(this.list[firstIndex].getAttribute("value"));
        let secondValue = Number(this.list[secondIndex].getAttribute("value"));
        return (firstValue > secondValue) ? true : false;
    }

    swap = async(firstIndex, secondIndex) => {
        await this.pause();
        let firstValue = this.list[firstIndex].getAttribute("value");
        let secondValue = this.list[secondIndex].getAttribute("value");
        this.list[firstIndex].setAttribute("value", secondValue);
        this.list[firstIndex].style.height = `${3.8*secondValue}px`;
        this.list[secondIndex].setAttribute("value", firstValue);
        this.list[secondIndex].style.height = `${3.8*firstValue}px`;
    } 
}

export default Helper;
