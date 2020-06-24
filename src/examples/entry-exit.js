// Fourth Level

import React from "react";
import { Machine, interpret } from "xstate";

export default function EntryExitExample() {
  const home = {
    entry: () => console.log("*ps2 sound*"),
    on: {
      POWER: "off",
      DISC: {
        target: "game",
        actions: ["logTrayChange"]
      }
    }
  };

  const game = {
    on: {
      POWER: "off",
      DISC: {
        target: "home",
        actions: ["logTrayChange"]
      }
    },
    exit: () => console.log("Time to clean your room.")
  };

  const off = {
    type: "final"
  };

  const states = { home, game, off };

  const initial = "home";

  const config = {
    id: "playstation",
    initial,
    states,
    strict: true
  };

  const ps2Machine = Machine(config, {
    actions: {
      logTrayChange: (context, event) => console.log(`Game: ${event.name}.`)
    }
  });

  const service = interpret(ps2Machine).start();

  service.send({
    type: "DISC",
    name: "Spyro"
  });

  service.send({
    type: "DISC",
    name: "Spyro"
  });

  service.send({
    type: "DISC",
    name: "Crash Tag Team Racing"
  });

  service.send({
    type: "DISC",
    name: "Crash Tag Team Racing"
  });

  service.send("POWER");

  return (
    <>
      <h3>
        <pre>Entry Exit Example</pre>
      </h3>
      <pre>Check the console.</pre>
    </>
  );
}
