"use client";
import React, { useRef } from "react";

const UseDragToScroll = ({ children, className, style }) => {
  const scrollRef = useRef(null);
  let isDragging = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDragging = true;
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = "grabbing"; // Change cursor style
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust scrolling sensitivity
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grab"; // Reset cursor style
    }
  };

  return (
    <div
      ref={scrollRef}
      className={className}
      style={{
        overflow: "auto",
        cursor: "grab",
        ...style, // Allow custom styles
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
    >
      {children}
    </div>
  );
};

export default UseDragToScroll;
