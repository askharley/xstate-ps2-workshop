// First Level

import React from "react";
import { Machine } from "xstate";

export default function TransitionExample() {
  const home = {
    on: {
      POWER: "off",
      DISC: "game"
    }
  };

  // :(
  const game = {
    on: {
      POWER: "off",
      DISC: "home"
    }
  };

  const off = {
    type: "final"
  };

  const states = { home, game, off };

  const initial = "home";

  const config = {
    id: "game",
    initial,
    states,
    strict: true
  };

  const ps2Machine = Machine(config);

  // Initial State
  console.log(ps2Machine.initialState.value);

  // Should transition to home
  console.log(ps2Machine.transition("home", "DISC").value);

  // Should transition to game
  console.log(ps2Machine.transition("game", "DISC").value);

  // Should fail because your state is currently 'home'
  console.log(ps2Machine.transition("game", "DISC").value);

  // Should transition to broken
  console.log(ps2Machine.transition("off", "POWER").value);

  // Transitioning after a final state ==  BIG NO NO
  console.log(ps2Machine.transition("game", "DISC").value);

  // Throws error as it can't handle an 'load' state
  //console.log(ps2Machine.transition("lload", "DISC").value);

  // THrows error as state 'game' cannot handle an 'EXIT' event
  //console.log(ps2Machine.transition("game", "EXIT").value);

  return (
    <>
      <h3>
        <pre>Transitions Example</pre>
      </h3>
      <pre>Check the console.</pre>
    </>
  );
}
