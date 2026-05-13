import { useState, useRef, useCallback, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  label?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  label,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const onMouseDown = useCallback(() => { isDragging.current = true; }, []);
  const onMouseUp = useCallback(() => { isDragging.current = false; }, []);
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging.current) updatePosition(e.clientX);
  }, [updatePosition]);

  const onTouchMove = useCallback((e: TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  }, [updatePosition]);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 2));
    if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 2));
  };

  return (
    <figure className="w-full">
      {label && (
        <figcaption className="text-center text-sm text-gray-500 mb-3">{label}</figcaption>
      )}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-xl select-none cursor-col-resize"
        style={{ aspectRatio: '16/9' }}
        aria-label="Comparador antes y después. Use las flechas del teclado para mover el divisor."
        onTouchMove={(e) => onTouchMove(e.nativeEvent)}
      >
        {/* AFTER image (full, background) */}
        <img
          src={afterSrc}
          alt={afterAlt}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* BEFORE image (clipped to left side) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
          aria-hidden="true"
        >
          <img
            src={beforeSrc}
            alt={beforeAlt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ minWidth: containerRef.current?.getBoundingClientRect().width ?? 600 }}
            draggable={false}
          />
        </div>

        {/* Labels */}
        <span
          className="absolute top-3 left-3 bg-gray-900/70 text-white text-xs font-semibold px-2 py-1 rounded pointer-events-none"
          aria-hidden="true"
        >
          Antes
        </span>
        <span
          className="absolute top-3 right-3 bg-forteza-green/90 text-white text-xs font-semibold px-2 py-1 rounded pointer-events-none"
          aria-hidden="true"
        >
          Después
        </span>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md pointer-events-none"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        />

        {/* Drag handle */}
        <button
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-col-resize z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forteza-green"
          style={{ left: `${position}%` }}
          onMouseDown={onMouseDown}
          onKeyDown={onKeyDown}
          aria-label={`Divisor antes/después al ${Math.round(position)}%. Use las flechas para mover.`}
          aria-valuenow={Math.round(position)}
          aria-valuemin={0}
          aria-valuemax={100}
          role="slider"
        >
          <svg className="w-5 h-5 text-forteza-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l-4 4 4 4M16 9l4 4-4 4" />
          </svg>
        </button>
      </div>
    </figure>
  );
}
