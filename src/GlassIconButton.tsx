import React, { useState } from 'react';

export type GlassIconButtonProps = {
  backgroundColor: string;
  borderColor: string;
  opacity: number;
  blur: number;
  borderBrightness: number;
  borderWidth: number;
  borderGradientContrast: number;
  highlightOpacity: number;
  highlightHeight: number;
  shadowStrength: number;
  size?: number;
  ariaLabel: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export function GlassIconButton({
  backgroundColor,
  borderColor,
  opacity,
  blur,
  borderWidth,
  size = 28,
  ariaLabel,
  onClick,
  children,
}: GlassIconButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const scale = pressed ? 0.88 : hovered ? 0.95 : 1;

  return (
    <div
      className="relative inline-flex shrink-0 items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        padding: borderWidth,
        border: '1px solid ' + borderColor,
        transform: `scale(${scale})`,
        transition: 'transform 150ms cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={onClick}
        className="relative flex h-full w-full items-center justify-center rounded-full text-white/80 outline-none"
        style={{
          backgroundColor,
          opacity,
          backdropFilter: blur > 0 ? `blur(${blur}px)` : 'none',
          fontFamily: 'var(--font-inter)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setPressed(false);
        }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
      >
        <span className="relative flex items-center justify-center">{children}</span>
      </button>
    </div>
  );
}

