import React, { Component } from 'react';
import ReactDOM from "react-dom";
require('./Counter.css');

class Counter extends Component {
  
  constructor(props){
    super(props)
    console.log("constructor: Default state time!");
    this.state = {
      count:0
    }
    this.increase = this.increment.bind(this) 
  }
  
  increment(event){
    event.preventDefault;
    this.setState({
      count:this.state.count+1
    })
  }

  componentWillMount() {
    console.log("componentWillMount: Component is about to mount!");
  }
  componentDidMount() {
    console.log("componentDidMount: Component just mounted!");
  }
  
  componentWillUnmount() {
    console.log("componentWillUnmount: Component is about to be removed from the DOM!");
  }

  shouldComponentUpdate(newProps, newState){
    console.log("shouldComponentUpdate: Should component update?");
    if(newState.count<5){
      return true;
    } else {
      ReactDOM.unmountComponentAtNode(document.getElementById("app"));
      console.log("shouldComponentUpdate: Component should not update!");
          return false;
    }
  }

  componentWillUpdate(newProps, newState) {
    console.log("componentWillUpdate: Component is about to update!");
  }
  componentDidUpdate(currentProps, currentState) {
    console.log("componentDidUpdate: Component just updated!");
  }

  componentWillReceiveProps(newProps) {
    console.log("componentWillReceiveProps: Component will get new props!");
  }


  render() {
    {console.log("render")}
    return (
      <div className="container Main">
        <h1> React Lifecycle methods </h1>
        <div>
            <h2>{this.state.count}</h2>
            <button onClick={this.increase} className="btn btn-primary btn-md"> Increment </button>
        </div>
      </div>
    );
  }

};
console.log(  Counter.defaultProps = {
    message:"inital prop set"
    }
  );
export default Counter;
