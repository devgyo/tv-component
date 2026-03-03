'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { hexToRgba } from './color-utils';
import { Icon } from './Icon';

type Stock = {
  code: string;
  name: string;
  logo: string;
};

const DEFAULT_WATCHLIST_LABEL = 'Watchlist';

export type BarIconHoverPreset = 'none' | 'subtle' | 'medium';

/** 样式默认值（非颜色，颜色由项目层 --bar-bg、--bar-border 提供） */
const DEFAULT_TOOLBAR_OPACITY = 1;
const DEFAULT_TOOLBAR_BLUR = 24;
const DEFAULT_TOOLBAR_BORDER_WIDTH = 1;
const DEFAULT_TOOLBAR_HIGHLIGHT = 0.15;
const DEFAULT_TOOLBAR_HIGHLIGHT_HEIGHT = 1;
const DEFAULT_TOOLBAR_SHADOW_STRENGTH = 1;
const DEFAULT_ACCENT_HIGHLIGHT_VISIBLE = true;
const DEFAULT_TOOLBAR_ACCENT_OPACITY = 0.22;
const DEFAULT_TOOLBAR_ACCENT_GRADIENT_STOP = 0.6;
const DEFAULT_BAR_ICON_HOVER_PRESET: BarIconHoverPreset = 'medium';

const BAR_ICON_HOVER_CLASS: Record<BarIconHoverPreset, string> = {
  none: '',
  subtle: 'hover:bg-white/5',
  medium: 'hover:bg-white/10',
};

type WatchlistPopoverRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type BarProps = {
  /** 是否处于切换 Ticker 时的入场动画中 */
  barAnimating?: boolean;

  /** 玻璃 Bar 样式参数（可选，有默认值；颜色由 --bar-bg、--bar-border 提供） */
  toolbarOpacity?: number;
  toolbarBlur?: number;
  toolbarBorderWidth?: number;
  toolbarHighlight?: number;
  toolbarHighlightHeight?: number;
  toolbarShadowStrength?: number;
  accentHighlightVisible?: boolean;
  accentColor?: string;
  toolbarAccentOpacity?: number;
  toolbarAccentGradientStop?: number;
  barIconHoverPreset?: BarIconHoverPreset;

  /** 当前 view / Ticker 上下文 */
  selectedStockForChart: Stock | null;
  selectedWatchlist: string | null;
  currentWatchlistColor?: string;
  onBackToWatchlist: () => void;

  /** Watchlist/Ticker 下拉 */
  watchlistPopoverRect: WatchlistPopoverRect | null;
  setWatchlistPopoverRect: (rect: WatchlistPopoverRect | null) => void;
  watchlistButtonRef: React.RefObject<HTMLButtonElement | null>;

  /** 中间 view 切换 */
  viewVisible: Record<string, boolean>;
  barItemsShown: Record<string, boolean>;
  toggleView: (
    key: "ticker" | "event" | "news" | "options" | "snapshot" | "darkpool",
  ) => void;

  /** 更多菜单 */
  barDotsPopoverRect: DOMRect | null;
  setBarDotsPopoverRect: (rect: DOMRect | null) => void;

  /** Alert / Search */
  alertOn: boolean;
  onAlertClick: () => void;
  onSearchClick: () => void;
};

function BarGlassIconButton({
  opacity,
  blur,
  borderWidth,
  highlightOpacity,
  highlightHeight,
  shadowStrength,
  size = 28,
  ariaLabel,
  onClick,
  children,
}: {
  opacity: number;
  blur: number;
  borderWidth: number;
  highlightOpacity: number;
  highlightHeight: number;
  shadowStrength: number;
  size?: number;
  ariaLabel: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const shadowAlpha = Math.max(
    0,
    Math.min(1, 0.2 + 0.4 * shadowStrength),
  );

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
        backgroundImage: 'linear-gradient(to bottom, var(--bar-border), var(--bar-border), var(--bar-border))',
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
          backgroundColor: `color-mix(in srgb, var(--bar-bg) ${(hovered ? Math.max(0, Math.min(1, opacity - 0.2)) : opacity) * 100}%, transparent)`,
          backdropFilter: blur > 0 ? `blur(${blur}px)` : 'none',
          boxShadow: `0 18px 45px rgba(0,0,0,${shadowAlpha})`,
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
        {highlightOpacity > 0 && (
          <div
            className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/55 via-white/15 to-transparent mix-blend-screen"
            style={{
              opacity: highlightOpacity,
              transform: `scaleY(${highlightHeight})`,
              transformOrigin: 'center',
            }}
            aria-hidden
          />
        )}
        <span className="relative flex items-center justify-center">
          {children}
        </span>
      </button>
    </div>
  );
}

export function Bar({
  barAnimating,
  toolbarOpacity = DEFAULT_TOOLBAR_OPACITY,
  toolbarBlur = DEFAULT_TOOLBAR_BLUR,
  toolbarBorderWidth = DEFAULT_TOOLBAR_BORDER_WIDTH,
  toolbarHighlight = DEFAULT_TOOLBAR_HIGHLIGHT,
  toolbarHighlightHeight = DEFAULT_TOOLBAR_HIGHLIGHT_HEIGHT,
  toolbarShadowStrength = DEFAULT_TOOLBAR_SHADOW_STRENGTH,
  accentHighlightVisible = DEFAULT_ACCENT_HIGHLIGHT_VISIBLE,
  accentColor,
  toolbarAccentOpacity = DEFAULT_TOOLBAR_ACCENT_OPACITY,
  toolbarAccentGradientStop = DEFAULT_TOOLBAR_ACCENT_GRADIENT_STOP,
  selectedStockForChart,
  selectedWatchlist,
  currentWatchlistColor,
  onBackToWatchlist,
  watchlistPopoverRect,
  setWatchlistPopoverRect,
  watchlistButtonRef,
  viewVisible,
  barItemsShown,
  toggleView,
  barIconHoverPreset = DEFAULT_BAR_ICON_HOVER_PRESET,
  barDotsPopoverRect,
  setBarDotsPopoverRect,
  alertOn,
  onAlertClick,
  onSearchClick,
}: BarProps) {
  const shadowAlpha = Math.max(
    0,
    Math.min(1, 0.2 + 0.4 * toolbarShadowStrength),
  );
  const currentAlpha = Math.min(1, Math.max(0, toolbarOpacity));
  const barHeight = 40;

  return (
    <div className="page-fade-in z-30 fixed bottom-4 left-1/2 -translate-x-1/2">
      <div
        className={`flex items-center gap-2 ${barAnimating ? "bar-ticker-enter" : ""}`}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {selectedStockForChart ? (
          <BarGlassIconButton
            opacity={toolbarOpacity}
            blur={toolbarBlur}
            borderWidth={toolbarBorderWidth}
            highlightOpacity={toolbarHighlight}
            highlightHeight={toolbarHighlightHeight}
            shadowStrength={toolbarShadowStrength}
            size={34}
            ariaLabel="返回 Watchlist"
            onClick={onBackToWatchlist}
          >
            <span className="flex items-center justify-center p-[5px]">
              <Icon name="back" className="h-5 w-5" strokeWidth={1.33} />
            </span>
          </BarGlassIconButton>
        ) : null}

        {/* 中间毛玻璃条 */}
        <div
          className="relative rounded-full"
          style={{
            padding: toolbarBorderWidth,
            backgroundImage: 'linear-gradient(to bottom, var(--bar-border), var(--bar-border), var(--bar-border))',
          }}
        >
          <div
            className="relative flex items-center gap-2 rounded-full bg-white/5 p-1"
            style={{
              backgroundColor: `color-mix(in srgb, var(--bar-bg) ${currentAlpha * 100}%, transparent)`,
              backdropFilter: toolbarBlur > 0 ? `blur(${toolbarBlur}px)` : 'none',
              boxShadow: `0 18px 45px rgba(0,0,0,${shadowAlpha})`,
              height: barHeight,
              minHeight: barHeight,
            }}
            role="toolbar"
            aria-label="View 切换"
          >
            {toolbarHighlight > 0 && (
              <div
                className="pointer-events-none absolute inset-0 rounded-[999px] bg-gradient-to-b from-white/55 via-white/15 to-transparent mix-blend-screen"
                style={{
                  opacity: toolbarHighlight,
                  transform: `scaleY(${toolbarHighlightHeight})`,
                  transformOrigin: 'center',
                }}
                aria-hidden
              />
            )}
            {accentHighlightVisible && accentColor && (
              <div
                className="pointer-events-none absolute inset-0 rounded-[999px]"
                style={{
                  background: `linear-gradient(to bottom, ${hexToRgba(accentColor, Math.min(1, Math.max(0, toolbarAccentOpacity)))}, transparent ${Math.round(toolbarAccentGradientStop * 100)}%)`,
                  mixBlendMode: 'overlay',
                  transform: `scaleY(${toolbarHighlightHeight})`,
                  transformOrigin: 'center',
                }}
                aria-hidden
              />
            )}
            <div className="relative flex items-center gap-2">
              {barItemsShown.watchlist ? (
                <>
                  <div className="flex items-center gap-1.5">
                    <button
                      title={selectedStockForChart ? "Ticker" : "Watchlist"}
                      ref={watchlistButtonRef}
                      type="button"
                      onClick={() => {
                        if (watchlistPopoverRect) {
                          setWatchlistPopoverRect(null);
                        } else {
                          const buttonEl = watchlistButtonRef.current;
                          const buttonRect = buttonEl?.getBoundingClientRect();
                          const barEl = buttonEl?.closest(
                            '[role="toolbar"]',
                          ) as HTMLElement | null;
                          const barRect = barEl?.getBoundingClientRect();
                          if (buttonRect) {
                            setWatchlistPopoverRect({
                              left: barRect?.left ?? buttonRect.left,
                              top: buttonRect.top,
                              width: buttonRect.width,
                              height: buttonRect.height,
                            });
                          }
                        }
                      }}
                      aria-label={selectedStockForChart ? "Ticker" : "Watchlist"}
                      aria-expanded={!!watchlistPopoverRect}
                      className="flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-full py-[2px] pl-[6px] pr-[10px] text-[12px] font-medium text-white/90 outline-none transition-[transform,background-color,color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-white/10 hover:text-white active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[#444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
                      style={{ width: "fit-content" }}
                    >
                      {selectedStockForChart ? (
                        <>
                          <Image
                            src={selectedStockForChart.logo}
                            alt={selectedStockForChart.code}
                            width={22}
                            height={22}
                            className="h-[22px] w-[22px] shrink-0 rounded-full object-contain"
                          />
                          <span className="font-semibold text-white">
                            {selectedStockForChart.code}
                          </span>
                        </>
                      ) : (
                        <>
                          <span
                            className="shrink-0"
                            style={
                              currentWatchlistColor
                                ? { color: currentWatchlistColor }
                                : undefined
                            }
                          >
                            <Icon name="bookmark" className="h-5 w-5 shrink-0" />
                          </span>
                          <span className="truncate text-[13px]">
                            {selectedWatchlist ?? DEFAULT_WATCHLIST_LABEL}
                          </span>
                        </>
                      )}
                    </button>
                    <div className="h-4 w-px shrink-0 bg-white/20" aria-hidden />
                  </div>
                </>
              ) : null}
              <div className="flex items-center gap-[4px]">
                {[
                  {
                    key: "ticker" as const,
                    label: "Ticker",
                    icon: "ticker" as const,
                  },
                  { key: "event" as const, label: "Event", icon: "event" as const },
                  { key: "news" as const, label: "News", icon: "news" as const },
                  ...(selectedStockForChart
                    ? ([
                        {
                          key: "options" as const,
                          label: "Options",
                          icon: "settings" as const,
                        },
                        {
                          key: "snapshot" as const,
                          label: "Snapshot",
                          icon: "snapshot" as const,
                        },
                        {
                          key: "darkpool" as const,
                          label: "Darkpool",
                          icon: "darkpool" as const,
                        },
                      ] as const)
                    : []),
                ]
                  .filter(({ key }) => barItemsShown[key])
                  .map(({ key, label, icon }) => (
                    <button
                      key={key}
                      title={label}
                      type="button"
                      onClick={() => toggleView(key)}
                      aria-label={label}
                      className={`flex h-8 w-8 items-center justify-center rounded-full p-[2px] outline-none transition-[transform,background-color,color] duration-150 active:scale-[0.9] focus-visible:ring-2 focus-visible:ring-[#444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a] ${
                        BAR_ICON_HOVER_CLASS[barIconHoverPreset]
                      } ${viewVisible[key] ? "" : "text-white/50 hover:text-white/70"}`}
                    >
                      <Icon
                        name={
                          key === "ticker"
                            ? "list"
                            : key === "options"
                              ? "options"
                              : icon
                        }
                        className={`h-5 w-5 ${viewVisible[key] ? "text-white" : ""}`}
                        strokeWidth={1.33}
                      />
                    </button>
                  ))}
                <button
                  title="更多"
                  type="button"
                  onClick={(e) => {
                    const rect = (
                      e.currentTarget as HTMLButtonElement
                    ).getBoundingClientRect();
                    setBarDotsPopoverRect(barDotsPopoverRect ? null : rect);
                  }}
                  aria-label="更多"
                  aria-expanded={!!barDotsPopoverRect}
                  className={`flex h-8 w-8 items-center justify-center rounded-full p-[2px] outline-none transition-[transform,background-color,color] duration-150 active:scale-[0.9] focus-visible:ring-2 focus-visible:ring-[#444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a] ${
                    BAR_ICON_HOVER_CLASS[barIconHoverPreset]
                  } text-white/70 hover:text-white`}
                >
                  <Icon name="dots" className="h-5 w-5" strokeWidth={1.33} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <BarGlassIconButton
          opacity={toolbarOpacity}
          blur={toolbarBlur}
          borderWidth={toolbarBorderWidth}
          highlightOpacity={toolbarHighlight}
          highlightHeight={toolbarHighlightHeight}
          shadowStrength={toolbarShadowStrength}
          size={34}
          ariaLabel={alertOn ? "Alert（开启）" : "Alert（关闭）"}
          onClick={onAlertClick}
        >
          <span className="flex items-center justify-center p-[5px]">
            <Icon
              name={alertOn ? "bell-ring" : "bell-minus"}
              className="h-5 w-5 shrink-0 transition-[color] duration-200"
              strokeWidth={1.33}
            />
          </span>
        </BarGlassIconButton>
        <BarGlassIconButton
          opacity={toolbarOpacity}
          blur={toolbarBlur}
          borderWidth={toolbarBorderWidth}
          highlightOpacity={toolbarHighlight}
          highlightHeight={toolbarHighlightHeight}
          shadowStrength={toolbarShadowStrength}
          size={34}
          ariaLabel="搜索"
          onClick={onSearchClick}
        >
          <span className="flex items-center justify-center p-[5px]">
            <Icon
              name="search"
              className="h-5 w-5 shrink-0"
              strokeWidth={1.5}
            />
          </span>
        </BarGlassIconButton>
      </div>
    </div>
  );
}
