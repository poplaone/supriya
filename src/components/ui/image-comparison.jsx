"use client";

import { cn } from "@/lib/utils";
import { useState, createContext, useContext } from "react";
import {
  motion,
  MotionValue,
  SpringOptions,
  useMotionValue,
  useSpring,
  useTransform
} from "motion/react";

const ImageComparisonContext = createContext(
  undefined
);

export const ImageComparison = ({
  children,
  className,
  enableHover,
  springOptions
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const motionValue = useMotionValue(50);
  const motionSliderPosition = useSpring(motionValue, springOptions ?? {
  bounce: 0,
  duration: 0
});
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleDrag = (event) => {
    if (!isDragging && !enableHover) return;

    const containerRect = (event.currentTarget).getBoundingClientRect();
    const x =
      "touches" in event
        ? event.touches[0].clientX - containerRect.left
        : event.clientX - containerRect.left;

    const percentage = Math.min(Math.max((x / containerRect.width) * 100, 0), 100);
    motionValue.set(percentage);
    setSliderPosition(percentage);
  };

  return (
    <ImageComparisonContext.Provider
      value={{ sliderPosition, setSliderPosition, motionSliderPosition }}>
      <div
        className={cn(
          "relative overflow-hidden select-none",
          enableHover && "cursor-ew-resize",
          className
        )}
        onMouseMove={handleDrag}
        onMouseDown={() => !enableHover && setIsDragging(true)}
        onMouseUp={() => !enableHover && setIsDragging(false)}
        onMouseLeave={() => !enableHover && setIsDragging(false)}
        onTouchMove={handleDrag}
        onTouchStart={() => !enableHover && setIsDragging(true)}
        onTouchEnd={() => !enableHover && setIsDragging(false)}>
        {children}
      </div>
    </ImageComparisonContext.Provider>
  );
};

export const ImageComparisonImage = ({
  className,
  alt,
  src,
  position
}) => {
  const context = useContext(ImageComparisonContext);
  if (!context) {
    throw new Error("ImageComparisonImage must be used within ImageComparison");
  }
  const { motionSliderPosition } = context;
  const leftClipPath = useTransform(motionSliderPosition, (value) => `inset(0 0 0 ${value}%)`);
  const rightClipPath = useTransform(
    motionSliderPosition,
    (value) => `inset(0 ${100 - value}% 0 0)`
  );

  return (
    <motion.img
      src={src}
      alt={alt}
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
      style={{
        clipPath: position === "left" ? leftClipPath : rightClipPath
      }}
    />
  );
};

export const ImageComparisonSlider = ({
  className,
  children
}) => {
  const context = useContext(ImageComparisonContext);
  if (!context) {
    throw new Error("ImageComparisonSlider must be used within ImageComparison");
  }
  const { motionSliderPosition } = context;

  const left = useTransform(motionSliderPosition, (value) => `${value}%`);

  return (
    <motion.div
      className={cn("absolute top-0 bottom-0 w-1 cursor-ew-resize", className)}
      style={{
        left
      }}>
      {children}
    </motion.div>
  );
};