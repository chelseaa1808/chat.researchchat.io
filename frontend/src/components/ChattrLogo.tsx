import React from "react";

interface ResearchChatLogoProps {
  className?: string;
  width?: number;
  height?: number;
  title?: string;
}

export default function ResearchChatLogo({
  className = "w-8 h-8",
  width = 64,
  height = 64,
  title = "ResearchChat Logo",
}: ResearchChatLogoProps) {
  return (
    <img
      src="/ResearchChatLogo.png"
      alt={title}
      title={title}
      className={className}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
    />

  );
}
