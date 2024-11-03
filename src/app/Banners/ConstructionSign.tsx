import clsx from "clsx";
import "./ConstructionSign.css";

export function ConstructionSign({ className }: { className?: string }) {
  return (
    <div className={clsx("construction-sign", className)}>
      <div className="bg left"/>
      <div className="bg right"/>
      <div className="text-container">
        ALWAYS UNDER CONSTRUCTION&emsp;&emsp;
        ALWAYS UNDER CONSTRUCTION&emsp;&emsp;
        ALWAYS UNDER CONSTRUCTION&emsp;&emsp;
        ALWAYS UNDER CONSTRUCTION&emsp;&emsp;
        ALWAYS UNDER CONSTRUCTION
      </div>
    </div>
  );
}

