import { useEffect, useState } from "react";
import "./NotFound.css";
import clsx from "clsx";

const NOT_FOUND = 404;

export function NotFound() {
  const [value, setValue] = useAnimatedValue(100);
  useEffect(
    () => {
      setValue(NOT_FOUND);
    },
    [setValue]
  );

  return <div className="not-found page grow flex-col">
    <h1 className="code">{value}</h1>

    <div className={clsx("flex", "detail",
      { hide: value !== NOT_FOUND }
    )}>
      🤷 (Not found)
    </div>
  </div>;
}

function useAnimatedValue(initialValue: number): [number, React.Dispatch<React.SetStateAction<number>>] {
  const [targetValue, setTargetValue] = useState(initialValue);
  const [currentValue, setCurrentValue] = useState(initialValue);

  useEffect(() => {
    const distance = Math.abs(currentValue - targetValue);
    if (distance > 0) {
      const delay = 500 / Math.pow(distance, 1.5);
      const interval = setInterval(() => {
        setCurrentValue((prev: any) => {
          if (prev >= targetValue) {
            clearInterval(interval);
            return targetValue;
          }
          return prev + 1;
        });
      }, delay);

      return () => clearInterval(interval);
    }
  }, [currentValue, targetValue, setCurrentValue]);

  return [currentValue, setTargetValue];
}