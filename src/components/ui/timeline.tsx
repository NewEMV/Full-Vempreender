
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TimelineProps = {
  children: React.ReactNode;
  className?: string;
};

export const Timeline = ({ children, className }: TimelineProps) => {
  return (
    <div className={cn("flex h-full w-full justify-center", className)}>
      <div className="w-full max-w-4xl">
        <div className="relative wrap h-full p-4 md:p-10">
          <div
            className="absolute h-full border border-dashed border-opacity-20 border-secondary"
            style={{ left: "calc(25% + 1.25rem)" }}
          ></div>
           {children}
        </div>
      </div>
    </div>
  );
};


type TimelineItemProps = {
    title: React.ReactNode;
    children: React.ReactNode;
};

export const TimelineItem = ({ children, title }: TimelineItemProps) => {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
        className="mb-8 flex w-full items-start justify-between md:flex-row"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={variants}
        transition={{ duration: 0.5 }}
    >
      <div className="order-1 w-1/4 pr-4 text-right">
        <h3 className="mb-3 text-xl font-bold text-foreground">{title}</h3>
      </div>
      <div className="z-20 order-1 flex h-10 w-10 items-center rounded-full bg-primary shadow-xl">
        <div className="mx-auto text-lg font-semibold text-primary-foreground">
          
        </div>
      </div>
      <div className="order-1 w-8/12 rounded-lg bg-card p-4 shadow-xl pl-8">
        <div className="text-sm font-medium leading-snug tracking-wide text-muted-foreground">
          {children}
        </div>
      </div>
    </motion.div>
  );
};
