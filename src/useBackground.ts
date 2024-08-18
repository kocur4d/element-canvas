import { mat3, vec3 } from "gl-matrix";
import { useCallback, useState } from "react";

export const useDrawBackground = (
  ctx: CanvasRenderingContext2D | undefined,
  viewMatrix: mat3
) => {
  const [dot] = useState<vec3>(vec3.fromValues(0, 0, 1));

  const renderBackground = useCallback(() => {
    if (ctx) {
      const patternCanvas = document.createElement("canvas");
      patternCanvas.width = 10;
      patternCanvas.height = 10;
      const patternCtx = patternCanvas.getContext("2d");

      if (patternCtx) {
        const result = vec3.transformMat3(vec3.create(), dot, viewMatrix);
        patternCtx.clearRect(0, 0, patternCanvas.width, patternCanvas.height);

        patternCtx.fillStyle = "#f4f7f7";
        patternCtx.fillRect(0, 0, 10, 10);
        patternCtx.fillStyle = "#d3d3d3";
        patternCtx.beginPath();
        patternCtx.arc(5, 5, 1, 0, 2 * Math.PI);
        patternCtx.fill();

        const pattern = ctx.createPattern(patternCanvas, "repeat");
        if (pattern) {
          ctx.save();
          ctx.translate(result[0] % 10, result[1] % 10);
          ctx.fillStyle = pattern;
          ctx.fillRect(
            -50,
            -50,
            ctx.canvas.width + 100,
            ctx.canvas.height + 100
          );
          ctx.restore();
        }
      }
    }
  }, [ctx, dot, viewMatrix]);

  return { renderBackground };
};
