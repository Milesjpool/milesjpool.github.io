import clsx from "clsx";
import "./ConstructionSign.css";

export function ConstructionSign({ className }: { className?: string }) {
  return (
    <div className={clsx("construction-sign flex overflow-hidden", className)}>
      <div className="bg left" />
      <div className="bg right" />
      <div className="text-container bg-white">
        ALWAYS UNDER CONSTRUCTION&emsp;&emsp;
        ALWAYS UNDER CONSTRUCTION&emsp;&emsp;
        ALWAYS UNDER CONSTRUCTION&emsp;&emsp;
        ALWAYS UNDER CONSTRUCTION&emsp;&emsp;
        ALWAYS UNDER CONSTRUCTION
      </div>
    </div>
  );
}

