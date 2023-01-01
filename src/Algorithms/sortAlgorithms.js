import React from "react";
import Helper from "../HelperFunctions/Helper";

class sortAlgorithms extends React.Component {
    constructor(time, array) {
        this.time = time;
        this.array = array;
        this.size = this.array.length;
        this.help = new Helper(this.time, this.array);
    }
}

export default sortAlgorithms;