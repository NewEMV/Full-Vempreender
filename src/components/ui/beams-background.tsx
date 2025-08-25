
"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const BeamsBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div
        className={cn(
          "[--color:hsl(var(--primary)_/_0.1)]",
          "bg-background",
          "[mask-image:radial-gradient(ellipse_at_center,black,transparent)]"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0)_0%,var(--color)_100%)]",
            "opacity-40"
          )}
        />
      </div>
    </div>
  );
};
