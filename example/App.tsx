import React from "react";
import { Typewriter } from "custom-typewriter";

export default function App() {
  return (
    <div>
      <Typewriter
        text="Hello, World!"
        speed={5}
        cursor={true}
        blinkRate={3}
        cursorChar="|"
        color="black"
        size="20"
        onComplete={() => console.log("Typing complete!")}
        hide
      />
    </div>
  );
}
