"use client";

import { useRef, useState } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { DEFAULT_IMAGE_TRANSFORM, type ImageTransform } from "./kardModes";

interface ImageAdjusterProps {
  imageUrl?: string | null;
  value: ImageTransform;
  onChange: (transform: ImageTransform) => void;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function ImageAdjuster({ imageUrl, value, onChange }: ImageAdjusterProps) {
  const dragStart = useRef<{ pointerId: number; x: number; y: number; start: ImageTransform } | null>(null);
  const [dragging, setDragging] = useState(false);

  const setScale = (scale: number) => {
    onChange({ ...value, scale: clamp(Number(scale.toFixed(2)), 1, 2.5) });
  };

  return (
    <div className="space-y-3">
      <div
        className="relative h-[220px] w-full overflow-hidden rounded-[16px] border border-[#e5e5e5] bg-[#f6f3ee] touch-none"
        onPointerDown={(event) => {
          if (!imageUrl) return;
          event.currentTarget.setPointerCapture(event.pointerId);
          dragStart.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, start: value };
          setDragging(true);
        }}
        onPointerMove={(event) => {
          const start = dragStart.current;
          if (!start || start.pointerId !== event.pointerId) return;
          onChange({
            ...value,
            x: start.start.x + event.clientX - start.x,
            y: start.start.y + event.clientY - start.y,
          });
        }}
        onPointerUp={(event) => {
          if (dragStart.current?.pointerId === event.pointerId) dragStart.current = null;
          setDragging(false);
        }}
        onWheel={(event) => {
          if (!imageUrl) return;
          event.preventDefault();
          setScale(value.scale + (event.deltaY > 0 ? -0.06 : 0.06));
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Adjust selected photo"
            className={`h-full w-full object-cover ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
            style={{
              transform: `translate(${value.x}px, ${value.y}px) scale(${value.scale})`,
              transformOrigin: "center center",
            }}
            draggable={false}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-[#888]">Upload a photo to adjust it</div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button type="button" className="grid h-8 w-8 place-items-center rounded-lg border border-[#e5e5e5] text-black" onClick={() => setScale(value.scale - 0.1)} aria-label="Zoom out">
          <Minus size={14} />
        </button>
        <input
          type="range"
          min="1"
          max="2.5"
          step="0.01"
          value={value.scale}
          onChange={(event) => setScale(Number(event.target.value))}
          className="flex-1 accent-[#ff6600]"
          aria-label="Photo zoom"
          disabled={!imageUrl}
        />
        <button type="button" className="grid h-8 w-8 place-items-center rounded-lg border border-[#e5e5e5] text-black" onClick={() => setScale(value.scale + 0.1)} aria-label="Zoom in">
          <Plus size={14} />
        </button>
        <button type="button" className="grid h-8 w-8 place-items-center rounded-lg border border-[#e5e5e5] text-black" onClick={() => onChange(DEFAULT_IMAGE_TRANSFORM)} aria-label="Reset photo position">
          <RotateCcw size={14} />
        </button>
      </div>
    </div>
  );
}
