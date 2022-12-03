import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Slider as SliderDHX } from "dhx-suite";
import "dhx-suite/codebase/suite.min.css";
import React, { Component } from "react";
import './OrgParticipant.css'

class Slider extends Component{
  constructor(props) {
      super(props);
      this.state = {
          event: "",
          val: this.props.dataFromParent,
      };
  }

  sendData = () => { this.props.parentCallback(this.state.val); console.log("sendData from child", this.state.val)}

  // console.log("from child")

  componentDidMount() {
      this.slider = new SliderDHX(this.el, {
          css: 'custom_class',
          min: 0,
          max: 100,
          step: 1,
          thumbLabel: true,
          label: "Relevance:",
          value: this.props.dataFromParent, //sets default to selected participant weight
          //tick: 1,
          // majorTick: 10,
          tickTemplate: val => "Important",
      });
      // this.sendData();
      console.log("component DID mount hmm")
      this.slider.events.on("change", val => {this.setState({ event: "change", val: val });this.sendData()});
      this.slider.events.on("mousedown", val => this.setState({ event: "mousedown" }));
      this.slider.events.on("mouseup", val => this.sendData());
      
      
      this.slider.setValue(this.props.dataFromParent)

  }
  componentWillUnmount() {
      this.slider && this.slider.destructor();
  }

  render() {

      return (
        <div>
          <div ref={el => (this.el = el)} style={{ width: "300px", height: "50px", justifyContent: "center", margin: "auto" }}></div>
        </div>
      )
  }
}
Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  mode: PropTypes.oneOf(["vertical", "horizontal"]),
  range: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.number, PropTypes.string]),
  inverse: PropTypes.bool,
  tooltip: PropTypes.bool,
  css: PropTypes.string,
  tick: PropTypes.number,
  tickTemplate: PropTypes.func,
  majorTick: PropTypes.number,
  label: PropTypes.string,
  required: PropTypes.bool,
  helpMessage: PropTypes.string,
  labelPosition: PropTypes.string,
  labelWidth: PropTypes.string,
  hiddenLabel: PropTypes.bool,
};
export default Slider;
