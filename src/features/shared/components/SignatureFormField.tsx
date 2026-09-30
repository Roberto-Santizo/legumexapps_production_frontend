import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useController, type Control, type FieldValues, type Path, type RegisterOptions } from "react-hook-form";
import { Eraser } from "lucide-react";
import { canvasToPngFile, getCanvasPoint, resizeSignatureCanvas } from "@/features/shared/shared";

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  fileName?: string;
  strokeColor?: string;
  lineWidth?: number;
  disabled?: boolean;
  validation?: RegisterOptions<T, Path<T>>;
};

type Point = { x: number; y: number };

export function SignatureFormField<T extends FieldValues>({
  name,
  control,
  label,
  fileName = "firma.png",
  strokeColor = "#1a1a19",
  lineWidth = 2.2,
  disabled = false,
  validation,
}: Props<T>) {
  const { field, fieldState: { error } } = useController({ name, control, rules: validation });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const lastPointRef = useRef<Point | null>(null);
  const isDrawingRef = useRef(false);
  const previousValueRef = useRef<unknown>(null);
  const [hasStrokes, setHasStrokes] = useState(false);
  const { onChange, value } = field;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let previousWidth = 0;
    const observer = new ResizeObserver(([entry]) => {
      const width = Math.round(entry.contentRect.width);
      if (width === previousWidth) return;
      previousWidth = width;
      contextRef.current = resizeSignatureCanvas(canvas, strokeColor, lineWidth);
      setHasStrokes(false);
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [strokeColor, lineWidth]);

  useEffect(() => {
    const hadValue = previousValueRef.current;
    previousValueRef.current = value;
    if (!hadValue || value) return;
    const canvas = canvasRef.current;
    contextRef.current?.clearRect(0, 0, canvas?.width ?? 0, canvas?.height ?? 0);
    setHasStrokes(false);
  }, [value]);

  const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (disabled || !canvas || !context) return;
    canvas.setPointerCapture(event.pointerId);
    const point = getCanvasPoint(canvas, event);
    isDrawingRef.current = true;
    lastPointRef.current = point;
    context.beginPath();
    context.arc(point.x, point.y, lineWidth / 2, 0, Math.PI * 2);
    context.fill();
    setHasStrokes(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const lastPoint = lastPointRef.current;
    if (!isDrawingRef.current || !canvas || !context || !lastPoint) return;
    const point = getCanvasPoint(canvas, event);
    const midPoint = { x: (lastPoint.x + point.x) / 2, y: (lastPoint.y + point.y) / 2 };
    context.beginPath();
    context.moveTo(lastPoint.x, lastPoint.y);
    context.quadraticCurveTo(lastPoint.x, lastPoint.y, midPoint.x, midPoint.y);
    context.lineTo(point.x, point.y);
    context.stroke();
    lastPointRef.current = point;
  };

  const handlePointerUp = async () => {
    if (!isDrawingRef.current || !canvasRef.current) return;
    isDrawingRef.current = false;
    lastPointRef.current = null;
    field.onBlur();
    onChange(await canvasToPngFile(canvasRef.current, fileName));
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    contextRef.current?.clearRect(0, 0, canvas?.width ?? 0, canvas?.height ?? 0);
    setHasStrokes(false);
    onChange(null);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div
        className={`relative h-44 overflow-hidden rounded-2xl border bg-surface transition-colors ${
          error ? "border-red-300" : "border-line hover:border-line-strong focus-within:border-ink"
        } ${disabled ? "opacity-60" : ""}`}
      >
        <canvas
          ref={canvasRef}
          id={name}
          tabIndex={disabled ? -1 : 0}
          aria-label={label ?? "Área de firma"}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`absolute inset-0 h-full w-full touch-none outline-none ${
            disabled ? "cursor-not-allowed" : "cursor-crosshair"
          }`}
        />

        <div className="pointer-events-none absolute inset-x-6 bottom-10 flex items-end gap-2">
          <span className="font-mono text-sm leading-none text-ink-subtle">×</span>
          <span className="h-px flex-1 bg-line-strong" />
        </div>

        <p
          className={`pointer-events-none absolute inset-x-0 bottom-4 text-center text-xs text-ink-subtle transition-opacity duration-200 ${
            hasStrokes ? "opacity-0" : "opacity-100"
          }`}
        >
          Firma sobre la línea
        </p>

        {hasStrokes && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-3 flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1 text-xs font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink focus-visible:outline-2 focus-visible:outline-ink"
          >
            <Eraser className="h-3.5 w-3.5" />
            Borrar firma
          </button>
        )}
      </div>

      {error && <p className="text-red-400 text-xs">{error.message}</p>}
    </div>
  );
}
