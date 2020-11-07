import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

const findByAttr = (wrapper, attr) => {
  return wrapper.find(`[data-test="${attr}"]`);
};

test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findByAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});
test("renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});
test("renders increment Button", () => {
  const wrapper = setup();
  const button = findByAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});
test("Counter Display starts at 0", () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state("counter");
  expect(initialCounterState).toBe(0);
});
test("clicking increment button increments counter display", () => {
  const counter = 9;
  const wrapper = setup({}, { counter });

  const button = findByAttr(wrapper, "increment-button");
  button.simulate("click");

  const counterDisplay = findByAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain("10");
});
test("renders decrement button", () => {
  const wrapper = setup();
  const decrementButton = findByAttr(wrapper, "decrement-button");
  expect(decrementButton.length).toBe(1);
});
test("clicking decrement button decrements counter display value", () => {
  const counter = 9;
  const wrapper = setup({}, { counter });

  const decrementButton = findByAttr(wrapper, "decrement-button");
  decrementButton.simulate("click");

  const counterDisplay = findByAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain("8");
});
test("when decrementing button, counter should not have value below 0", () => {
  const wrapper = setup();

  const decrementButton = findByAttr(wrapper, "decrement-button");
  decrementButton.simulate("click");

  const counterDisplay = findByAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(0);
});
test("app should not initialize rendering error message", () => {
  const wrapper = setup();
  const errorMessage = findByAttr(wrapper, "error-message");
  expect(errorMessage.length).toBe(0);
});
test("when counter equals 0, decrementing button should display error message", () => {
  const wrapper = setup();

  const decrementButton = findByAttr(wrapper, "decrement-button");
  decrementButton.simulate("click");

  const errorMessage = findByAttr(wrapper, "error-message");
  expect(errorMessage.length).toBe(1);
});
test("when error message is shown, incrementing button should clear message", () => {
  const wrapper = setup();

  const decrementButton = findByAttr(wrapper, "decrement-button");
  decrementButton.simulate("click");
  console.log(wrapper.state("displayError"));
  const incrementButton = findByAttr(wrapper, "increment-button");
  incrementButton.simulate("click");

  expect(wrapper.state("displayError")).toBe(false);
});
