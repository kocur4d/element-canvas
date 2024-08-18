import React, { useEffect } from "react";
import useCamera from "./useCamera";
import { useSetupCanvas } from "./useSetupCanvas";
import { vec3 } from "gl-matrix";
import { useDrawBackground } from "./useBackground";

const LEFT_MOUSE_BUTTON = 2;

const shape = [
  vec3.fromValues(100, 100, 1),
  vec3.fromValues(500, 100, 1),
  vec3.fromValues(500, 300, 1),
  vec3.fromValues(100, 300, 1),
];

const App: React.FC = () => {
  const { ref, ctx, clearCanvas, drawShape } = useSetupCanvas();
  const { pan, zoom, viewMatrix } = useCamera();
  const { renderBackground } = useDrawBackground(ctx, viewMatrix);

  useEffect(() => {
    clearCanvas();
    renderBackground();
    const transformedShape = shape.map((vertex) => {
      return vec3.transformMat3(vec3.create(), vertex, viewMatrix);
    });
    drawShape(transformedShape);
  }, [clearCanvas, drawShape, renderBackground, viewMatrix]);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Left mouse button is held down
    if (e.buttons === LEFT_MOUSE_BUTTON) {
      const dx = e.movementX;
      const dy = e.movementY;
      pan(dx, dy);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    const mouseX = e.pageX;
    const mouseY = e.pageY;
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    zoom(zoomFactor, mouseX, mouseY);
  };

  return (
    <canvas
      ref={ref}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
};

export default App;
