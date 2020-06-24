// Third Level

import React from "react";
import { Machine, interpret } from "xstate";

export default function ActionsExample() {
  const home = {
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
        actions: [
          (context, event) => {
            console.log(`Game: ${event.name}. Disc tray is now ${event.tray}.`);
          }
        ]
      }
    }
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
      logTrayChange: (context, event) =>
        console.log(`Game: ${event.name}. Disc tray is now ${event.tray}.`)
    }
  });

  const service = interpret(ps2Machine).start();

  service.send({
    type: "DISC",
    name: "Spyro",
    tray: "full"
  });

  service.send({
    type: "DISC",
    name: "Spyro",
    tray: "empty"
  });

  service.send("POWER");

  return (
    <>
      <h3>
        <pre>Actions Example</pre>
      </h3>
      <pre>Check the console.</pre>
    </>
  );
}
