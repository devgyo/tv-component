import React from 'react';

import Image from 'next/image';
import Tippy from '@tippyjs/react';

import { GlassBar } from './GlassBar';
import { GlassIconButton } from './GlassIconButton';
import { Icon } from './Icon';

type Stock = {
  code: string;
  name: string;
  logo: string;
};

const DEFAULT_WATCHLIST_LABEL = 'Watchlist';

type BarIconHoverPreset = 'default';

const BAR_ICON_HOVER_CLASS: Record<BarIconHoverPreset, string> = {
  default: 'hover:bg-white/10',
};

type WatchlistPopoverRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type BarProps = {
  /** 外层包裹，用于拖动时拿到定位信息 */
  toolbarWrapRef: React.RefObject<HTMLDivElement>;
  toolbarPosition: { x: number; y: number } | null;
  onToolbarDragStart: () => void;
  barAnimating: boolean;

  /** 玻璃 Bar 样式参数 */
  barBgColor: string;
  barBorderColor: string;
  toolbarOpacity: number;
  toolbarBlur: number;
  toolbarBorderBrightness: number;
  toolbarBorderWidth: number;
  toolbarBorderGradientContrast: number;
  toolbarHighlight: number;
  toolbarHighlightHeight: number;
  toolbarShadowStrength: number;
  accentHighlightVisible: boolean;
  accentColor?: string;
  toolbarAccentOpacity: number;
  toolbarAccentGradientStop: number;

  /** 当前 view / Ticker 上下文 */
  selectedStockForChart: Stock | null;
  selectedWatchlist: string | null;
  currentWatchlistColor?: string;
  onBackToWatchlist: () => void;

  /** Watchlist/Ticker 下拉 */
  watchlistPopoverRect: WatchlistPopoverRect | null;
  setWatchlistPopoverRect: (rect: WatchlistPopoverRect | null) => void;
  watchlistButtonRef: React.RefObject<HTMLButtonElement>;

  /** 中间 view 切换 */
  viewVisible: Record<string, boolean>;
  barItemsShown: Record<string, boolean>;
  toggleView: (
    key: "ticker" | "event" | "news" | "options" | "snapshot" | "darkpool",
  ) => void;
  barIconHoverPreset: BarIconHoverPreset;

  /** 更多菜单 */
  barDotsPopoverRect: DOMRect | null;
  setBarDotsPopoverRect: (rect: DOMRect | null) => void;

  /** Alert / Search */
  alertOn: boolean;
  onAlertClick: () => void;
  onSearchClick: () => void;
};

export function Bar({
  toolbarWrapRef,
  toolbarPosition,
  onToolbarDragStart,
  barAnimating,
  barBgColor,
  barBorderColor,
  toolbarOpacity,
  toolbarBlur,
  toolbarBorderBrightness,
  toolbarBorderWidth,
  toolbarBorderGradientContrast,
  toolbarHighlight,
  toolbarHighlightHeight,
  toolbarShadowStrength,
  accentHighlightVisible,
  accentColor,
  toolbarAccentOpacity,
  toolbarAccentGradientStop,
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
  barIconHoverPreset,
  barDotsPopoverRect,
  setBarDotsPopoverRect,
  alertOn,
  onAlertClick,
  onSearchClick,
}: BarProps) {
  return (
    <div
      ref={toolbarWrapRef}
      className={`page-fade-in z-30 ${
        toolbarPosition === null
          ? "fixed bottom-4 left-1/2 -translate-x-1/2"
          : ""
      }`}
      style={
        toolbarPosition !== null
          ? {
              position: "fixed",
              left: toolbarPosition.x,
              top: toolbarPosition.y,
            }
          : undefined
      }
    >
      <div
        className={`flex items-center gap-2 ${barAnimating ? "bar-ticker-enter" : ""}`}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <div
          role="button"
          tabIndex={0}
          aria-label="拖动工具栏"
          className="flex cursor-grab items-center justify-center rounded-full p-1.5 text-white/60 outline-none active:cursor-grabbing hover:bg-white/10 hover:text-white/80 focus-visible:ring-2 focus-visible:ring-[#444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
          onMouseDown={(e) => {
            e.preventDefault();
            onToolbarDragStart();
          }}
        >
          <Icon name="grip" className="h-4 w-4" />
        </div>
        {selectedStockForChart ? (
          <GlassIconButton
            backgroundColor={barBgColor}
            borderColor={barBorderColor}
            opacity={toolbarOpacity}
            blur={toolbarBlur}
            borderBrightness={toolbarBorderBrightness}
            borderWidth={toolbarBorderWidth}
            borderGradientContrast={toolbarBorderGradientContrast}
            highlightOpacity={toolbarHighlight}
            highlightHeight={toolbarHighlightHeight}
            shadowStrength={toolbarShadowStrength}
            size={34}
            ariaLabel="返回 Watchlist"
            onClick={() => {
              onBackToWatchlist();
            }}
          >
            <span className="flex items-center justify-center p-[5px]">
              <Icon name="back" className="h-5 w-5" strokeWidth={1.33} />
            </span>
          </GlassIconButton>
        ) : null}
        <GlassBar
          backgroundColor={barBgColor}
          borderColor={barBorderColor}
          opacity={toolbarOpacity}
          blur={toolbarBlur}
          borderBrightness={toolbarBorderBrightness}
          borderWidth={toolbarBorderWidth}
          borderGradientContrast={toolbarBorderGradientContrast}
          highlightOpacity={toolbarHighlight}
          highlightHeight={toolbarHighlightHeight}
          shadowStrength={toolbarShadowStrength}
          role="toolbar"
          ariaLabel="View 切换"
        >
          {barItemsShown.watchlist ? (
            <>
              <div className="flex items-center gap-1.5">
                <Tippy
                  content={selectedStockForChart ? "Ticker" : "Watchlist"}
                  placement="top"
                  delay={[200, 0]}
                >
                  <button
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
                </Tippy>
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
                <Tippy
                  key={key}
                  content={label}
                  placement="top"
                  delay={[200, 0]}
                >
                  <button
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
                </Tippy>
              ))}
            <Tippy content="更多" placement="top" delay={[200, 0]}>
              <button
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
            </Tippy>
          </div>
        </GlassBar>
        <GlassIconButton
          backgroundColor={barBgColor}
          borderColor={barBorderColor}
          opacity={toolbarOpacity}
          blur={toolbarBlur}
          borderBrightness={toolbarBorderBrightness}
          borderWidth={toolbarBorderWidth}
          borderGradientContrast={toolbarBorderGradientContrast}
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
        </GlassIconButton>
        <GlassIconButton
          backgroundColor={barBgColor}
          borderColor={barBorderColor}
          opacity={toolbarOpacity}
          blur={toolbarBlur}
          borderBrightness={toolbarBorderBrightness}
          borderWidth={toolbarBorderWidth}
          borderGradientContrast={toolbarBorderGradientContrast}
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
        </GlassIconButton>
      </div>
    </div>
  );
}
