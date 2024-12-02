import './App.scss';
import React from 'react';

const math = require('mathjs');

class CalcPad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "",
            numString: "0", 
            solved: false,
        };
        this.numpad = [
            {id: "seven", label: "7"},
            {id: "eight", label: "8"},
            {id: "nine", label: "9"},
            {id: "divide", label: "/"},
        
            {id: "four", label: "4"},
            {id: "five", label: "5"},
            {id: "six", label: "6"},
            {id: "multiply", label: "*"},
            
            {id: "three", label: "3"},
            {id: "two", label: "2"},
            {id: "one", label: "1"},
            {id: "subtract", label: "-"},
            
            {id: "zero", label: "0"},
            {id: "decimal", label: "."},
            {id: "equals", label: "="},
            {id: "add", label: "+"},
        
            {id: "clear", label: "AC"}
        ]
        this.onClick = this.onClick.bind(this);
    }

    onClick(operation){
        console.log(operation.target.innerText);
        switch(operation.target.innerText)
        {
            case "0":
                if(this.state.numString === "0") {
                    /* no leading zeros */
                    break;
                }
            // eslint-disable-next-line no-fallthrough
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                var numString = this.state.numString
                var display = this.state.display
                var newNumString = "";
                if(this.state.solved === true){
                    numString = "0";
                    display = ""
                }
                if (numString.length === 1 && numString[0] === "0") {
                    newNumString = operation.target.innerText;
                } else {
                    newNumString = numString.concat(operation.target.innerText);
                }
                this.setState({
                    display: display,
                    numString: newNumString,
                    solved: false,
                });
                break;
            case ".":
                // disallow multiple decimal points
                if(this.state.numString.indexOf(".") === -1)
                {
                    this.setState({
                        display: this.state.display,
                        numString: this.state.numString.concat(operation.target.innerText),
                        solved: false,
                    });
                }
                break;
            case "AC":
                this.setState({
                    display: "",
                    numString: "0",
                    solved: false,
                });
                break;
            case "-":
            case "+":
            case "/":
            case "*":
                var display = this.state.display;
                console.log("solved " + this.state.solved);
                if(this.state.solved === true) {
                    display = "";
                }
                console.log("display " + display);
                console.log("last char " + display[display.length -1]);
                var lastChar = display[display.length -1];
                if(operation.target.innerText === "-" && lastChar === "-" && this.state.numString === "0")
                {
                    this.setState({
                        display: display + " -",
                        numString: "0",
                        solved: false,
                    });
                    break;
                }
                if((lastChar === "+" || lastChar === "-" || lastChar === "*" || lastChar === "/") && 
                (lastChar === operation.target.innerText && this.state.numString === "0")) {
                    display = display.slice(0,display.length -1) + operation.target.innerText;
                    console.log(display);
                    this.setState({
                        display: display,
                        numString: "0",
                        solved: false,
                    });
                }
                else {
                    console.log("else ");
                    this.setState({
                        display: display + " " + this.state.numString + " " + operation.target.innerText,
                        numString: "0",
                        solved: false,
                    });
                    break;
                }
                break;
            case "=":
                if(this.state.display !== "") {
                    var equation = this.state.display + " " + this.state.numString;
                    const answer = math.evaluate(equation);
                    this.setState({
                        display: equation,
                        numString: answer,
                        solved: true,
                    });
                }
                break;
            default:
                console.log("Error found on" + operation.target.innerText);
                break;
        }
    }
    render() {
        const numpad = [];
        var i = 1;
        for(var obj of this.numpad) {
            if(obj.id === "clear") {
                numpad.push(<button id={obj.id} class="clear-button" onClick={this.onClick}><b>{obj.label}</b></button>);
            } else {
                numpad.push(<button id={obj.id} class="clac-button" onClick={this.onClick}><b>{obj.label}</b></button>);
            }
            if(i % 4 === 0) { 
                numpad.push(<br />);
            }
            i = i + 1;
        }
        return (
        <div>
            <h1>Calculator</h1>
            <div id="area">
                <div id="dual-display">
                <input value={this.state.display}/><br/>
                <input id="display" value={this.state.numString}/><br/>
                </div>
                {numpad}
            </div>
            designed and coded by: <br />Jason Ryan Cunningham
        </div>);
    }
}

function App() {
  return (
    <div className="App">
      <CalcPad />
    </div>
  );
}

export default App;