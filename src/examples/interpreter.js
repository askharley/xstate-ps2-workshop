// Second Level

import React from "react";
import { Machine, interpret } from "xstate";

export default function IntrepreterExample() {
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

  const service = interpret(ps2Machine).start();

  // On each transition
  service.onTransition(state => {
    console.log(state.value);
  });

  // Once a final state is reached
  service.onDone(() => {
    console.log("I'm done.");
  });

  // Once the machine has stopped
  service.onStop(() => {
    console.log("I've stopped.");
  });

  // Transition to 'game'
  service.send("DISC");

  // Transition to 'home'
  service.send("DISC");

  // Transition to 'off'
  service.send("POWER");

  // Does nothing and throws warning as the machine is done
  service.send("DISC");

  // Current state after send
  // console.log(service.state)

  return (
    <>
      <h3>
        <pre>Intrepreter Example</pre>
      </h3>
      <pre>Check the console.</pre>
    </>
  );
}
