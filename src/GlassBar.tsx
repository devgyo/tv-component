import React from 'react';

export type GlassBarProps = {
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
  role?: string;
  ariaLabel?: string;
  className?: string;
  children: React.ReactNode;
};

export function GlassBar({
  backgroundColor,
  borderColor,
  opacity,
  blur,
  highlightOpacity,
  highlightHeight,
  role,
  ariaLabel,
  className,
  children,
}: GlassBarProps) {
  return (
    <div
      className={`relative rounded-full border ${className ?? ''}`}
      style={{
        borderColor,
        backgroundColor,
        opacity,
        backdropFilter: blur > 0 ? `blur(${blur}px)` : 'none',
      }}
    >
      {highlightOpacity > 0 && (
        <div
          className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/40 via-white/10 to-transparent"
          style={{
            opacity: highlightOpacity,
            transform: `scaleY(${highlightHeight})`,
            transformOrigin: 'center',
          }}
          aria-hidden
        />
      )}
      <div
        className="relative flex items-center gap-2 px-2 py-1"
        role={role}
        aria-label={ariaLabel}
      >
        {children}
      </div>
    </div>
  );
}

