import { useEffect, useRef, useState } from "react";

export interface TypewriterProps {
  text: string;
  speed: number;
  cursor: boolean;
  blinkRate: number;
  cursorChar: string;
  cursorColor: string;
  color: string;
  size: number;
  loop: boolean;
  onComplete: () => void;
  pauseOnHover: boolean;
  hideOnComplete?: boolean;
}

export const Typewriter = ({
  text: initialText,
  speed: initialSpeed,
  cursor: initialCursor,
  blinkRate: initialBlinkRate,
  cursorChar: initialCursorChar,
  cursorColor,
  color: initialColor,
  size: initialSize,
  loop,
  onComplete,
  pauseOnHover,
  hideOnComplete,
}: TypewriterProps) => {
  const [displayText, setDisplayText] = useState("");
  const [blinkChar, setBlinkChar] = useState(initialCursorChar || "|");
  const blinkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [freeze, setFreeze] = useState(pauseOnHover ? true : false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    const targetText = initialText || "Start Typing text here";

    const typeNextCharacter = () => {
      if (!freeze && currentIndex <= targetText.length) {
        setDisplayText(targetText.substring(0, currentIndex));
        setCurrentIndex((prevIndex) => prevIndex + 1);

        if (currentIndex >= targetText.length && onComplete) {
          onComplete();
          setComplete(true);
        }
      } else {
        if (loop && currentIndex >= targetText.length) {
          setCurrentIndex(0);
        }
      }
    };

    const typingInterval = setInterval(
      typeNextCharacter,
      (10 - initialSpeed) * 100
    );

    return () => {
      clearInterval(typingInterval);
    };
  }, [initialText, initialSpeed, freeze, onComplete, loop, currentIndex]);

  useEffect(() => {
    const blinkCursor = () => {
      setBlinkChar((prevChar) =>
        freeze
          ? initialCursorChar
          : prevChar === initialCursorChar
            ? ""
            : initialCursorChar
      );
    };

    if (initialCursor) {
      blinkIntervalRef.current = setInterval(
        blinkCursor,
        (10 - initialBlinkRate) * 100
      );
    }

    return () => {
      blinkIntervalRef.current && clearInterval(blinkIntervalRef.current);
    };
  }, [initialCursor, initialBlinkRate, freeze, initialCursorChar]);

  return (
    <div
      onMouseEnter={() => setFreeze(pauseOnHover ? true : false)}
      onMouseLeave={() => setFreeze(false)}
      style={{
        color: initialColor || "#000",
        fontSize: `${initialSize || "20"}px`,
        cursor: complete ? "pointer" : "default",
      }}
    >
      {displayText}
      {hideOnComplete
        ? !complete && <span style={{ color: cursorColor }}>{blinkChar}</span>
        : initialCursor && (
            <span style={{ color: cursorColor }}>{blinkChar}</span>
          )}
    </div>
  );
};
export default Typewriter;
