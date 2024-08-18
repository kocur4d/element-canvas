import { vec3 } from "gl-matrix";
import { useCallback, useEffect, useState } from "react";

export const useSetupCanvas = () => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

  const ref = useCallback((node: HTMLCanvasElement) => {
    if (node) {
      const ctx = node.getContext("2d");
      if (ctx) {
        setCtx(ctx);
      }
    }
  }, []);

  useEffect(() => {
    if (ctx) {
      const canvas = ctx.canvas;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, [ctx]);

  const clearCanvas = useCallback(() => {
    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
  }, [ctx]);

  const drawShape = useCallback(
    (vectors: vec3[], material: string = "red") => {
      if (ctx) {
        ctx.beginPath();
        ctx.fillStyle = material;
        ctx.strokeStyle = material;
        const [first, ...rest] = vectors;
        ctx.moveTo(first[0], first[1]);
        for (let i = 0; i < rest.length; i += 1) {
          ctx.lineTo(rest[i][0], rest[i][1]);
        }
        ctx.fill();
        ctx.stroke();
      }
    },
    [ctx]
  );

  return { ref, ctx, clearCanvas, drawShape };
};
