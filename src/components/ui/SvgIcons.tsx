import React from "react";

interface IconProps {
  className?: string;
}

export function TrophyIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M7 4H17V10C17 12.7614 14.7614 15 12 15C9.23858 15 7 12.7614 7 10V4Z"
        fill="#FFD43B"
        stroke="#1F1209"
        strokeWidth="2"
      />
      <path
        d="M7 6H4C4 9.5 5.5 11 7 11M17 6H20C20 9.5 18.5 11 17 11"
        stroke="#FFD43B"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path d="M12 15V18" stroke="#1F1209" strokeWidth="2.5" />
      <rect
        x="8"
        y="18"
        width="8"
        height="3"
        rx="1"
        fill="#A66832"
        stroke="#1F1209"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function LightningIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M13 2L4 14H11L10 22L20 10H13L13 2Z"
        fill="#FFD43B"
        stroke="#1F1209"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CalendarAlertIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="3"
        fill="#FAF0D7"
        stroke="#1F1209"
        strokeWidth="2"
      />
      <path d="M3 10H21" stroke="#1F1209" strokeWidth="2" />
      <path d="M3 8C3 6.34315 4.34315 5 6 5H18C19.6569 5 21 6.34315 21 8V10H3V8Z" fill="#FA5252" />
      <path d="M8 3V6M16 3V6" stroke="#1F1209" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M12 13V16" stroke="#C92A2A" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="12" cy="18.5" r="1.2" fill="#C92A2A" />
    </svg>
  );
}

export function BookIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 5C4 3.89543 4.89543 3 6 3H19V19H6C4.89543 19 4 19.8954 4 21V5Z"
        fill="#4DABF7"
        stroke="#1F1209"
        strokeWidth="2"
      />
      <path
        d="M4 19.5C4 18.6716 4.67157 18 5.5 18H19V21H5.5C4.67157 21 4 20.3284 4 19.5Z"
        fill="#FAF0D7"
        stroke="#1F1209"
        strokeWidth="2"
      />
      <path d="M8 7H15M8 10.5H14" stroke="#FAF0D7" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function GearIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
        fill="#CED4DA"
        stroke="#1F1209"
        strokeWidth="2"
      />
      <path
        d="M19.4 15A1.65 1.65 0 0 0 19.73 16.82L19.79 16.88A2 2 0 1 1 16.96 19.71L16.9 19.65A1.65 1.65 0 0 0 15.08 19.32A1.65 1.65 0 0 0 14 20.83V21A2 2 0 1 1 10 21V20.91A1.65 1.65 0 0 0 8.92 19.4A1.65 1.65 0 0 0 7.1 19.73L7.04 19.79A2 2 0 1 1 4.21 16.96L4.27 16.9A1.65 1.65 0 0 0 4.6 15.08A1.65 1.65 0 0 0 3.09 14H3A2 2 0 1 1 3 10H3.09A1.65 1.65 0 0 0 4.6 8.92A1.65 1.65 0 0 0 4.27 7.1L4.21 7.04A2 2 0 1 1 7.04 4.21L7.1 4.27A1.65 1.65 0 0 0 8.92 4.6H9A1.65 1.65 0 0 0 10 3.09V3A2 2 0 1 1 14 3V3.09A1.65 1.65 0 0 0 15.08 4.6A1.65 1.65 0 0 0 16.9 4.27L16.96 4.21A2 2 0 1 1 19.79 7.04L19.73 7.1A1.65 1.65 0 0 0 19.4 8.92V9A1.65 1.65 0 0 0 20.91 10H21A2 2 0 1 1 21 14H20.91A1.65 1.65 0 0 0 19.4 15Z"
        stroke="#E9ECEF"
        strokeWidth="2"
      />
    </svg>
  );
}

export function HeartIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 20.5C12 20.5 3.5 14.8 3.5 8.8C3.5 6.1 5.6 4 8.2 4C9.8 4 11.2 4.8 12 6C12.8 4.8 14.2 4 15.8 4C18.4 4 20.5 6.1 20.5 8.8C20.5 14.8 12 20.5 12 20.5Z"
        fill="#FA5252"
        stroke="#1F1209"
        strokeWidth="2"
      />
    </svg>
  );
}

export function SearchIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle
        cx="10.5"
        cy="10.5"
        r="6.5"
        fill="#A5D8FF"
        stroke="#1F1209"
        strokeWidth="2.2"
      />
      <path
        d="M15.5 15.5L20.5 20.5"
        stroke="#1F1209"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CheckIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 12.5L9.5 17L19 7.5"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CrossIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChevronRightIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M9 5L16 12L9 19"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LockIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect
        x="5"
        y="11"
        width="14"
        height="10"
        rx="2"
        fill="#ADB5BD"
        stroke="#1F1209"
        strokeWidth="2"
      />
      <path
        d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11"
        stroke="#1F1209"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function StarIcon({ className = "w-10 h-10" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2L14.9 8.2L21.7 9.1L16.7 13.8L18 20.5L12 17.2L6 20.5L7.3 13.8L2.3 9.1L9.1 8.2L12 2Z"
        fill="#FFD43B"
        stroke="#1F1209"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DirectionArrowIcon({
  direction,
  className = "w-4 h-4",
}: {
  direction: "up" | "down";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`${className} ${direction === "down" ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path
        d="M12 4L20 13H15V20H9V13H4L12 4Z"
        fill="currentColor"
        stroke="#1F1209"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SwordModeIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M6 26L11 21M9 19L13 23" stroke="#862E08" strokeWidth="3" strokeLinecap="round" />
      <path d="M11 21L24 8L26 6L24 8L11 21Z" stroke="#E9ECEF" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M26 26L21 21M23 19L19 23" stroke="#862E08" strokeWidth="3" strokeLinecap="round" />
      <path d="M21 21L8 8L6 6" stroke="#FFD43B" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

export function PixelModeIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="4" width="8" height="8" fill="#FFD43B" stroke="#1F1209" strokeWidth="1.5" />
      <rect x="12" y="4" width="8" height="8" fill="#40C057" stroke="#1F1209" strokeWidth="1.5" />
      <rect x="20" y="4" width="8" height="8" fill="#FA5252" stroke="#1F1209" strokeWidth="1.5" />
      <rect x="4" y="12" width="8" height="8" fill="#4DABF7" stroke="#1F1209" strokeWidth="1.5" />
      <rect x="12" y="12" width="8" height="8" fill="#FFD43B" stroke="#1F1209" strokeWidth="1.5" />
      <rect x="20" y="12" width="8" height="8" fill="#40C057" stroke="#1F1209" strokeWidth="1.5" />
      <rect x="4" y="20" width="8" height="8" fill="#FA5252" stroke="#1F1209" strokeWidth="1.5" />
      <rect x="12" y="20" width="8" height="8" fill="#4DABF7" stroke="#1F1209" strokeWidth="1.5" />
      <rect x="20" y="20" width="8" height="8" fill="#FFD43B" stroke="#1F1209" strokeWidth="1.5" />
    </svg>
  );
}

export function ScrollModeIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect x="7" y="5" width="18" height="22" rx="3" fill="#FAF0D7" stroke="#1F1209" strokeWidth="2.2" />
      <path d="M11 11H21M11 16H21M11 21H17" stroke="#7C4A21" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function TowerModeIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M7 11V6H11V9H14V6H18V9H21V6H25V11L23 14V26H9V14L7 11Z" fill="#ADB5BD" stroke="#1F1209" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M14 26V19C14 17.8954 14.8954 17 16 17C17.1046 17 18 17.8954 18 19V26H14Z" fill="#522E12" stroke="#1F1209" strokeWidth="1.8" />
    </svg>
  );
}
