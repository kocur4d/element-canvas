import { useState } from "react";
import { mat3 } from "gl-matrix";

export interface Camera {
  viewMatrix: mat3;
  pan: (dx: number, dy: number) => void;
  zoom: (factor: number) => void;
}

function useCamera(): Camera {
  const [viewMatrix, setViewMatrix] = useState<mat3>(mat3.create());

  const pan = (dx: number, dy: number) => {
    setViewMatrix((old) => {
      const result = mat3.create();
      const T = mat3.fromTranslation(mat3.create(), [dx, dy]);
      mat3.multiply(result, T, old);
      return result;
    });
  };

  const zoom = (factor: number) => {
    setViewMatrix((old) => {
      const result = mat3.create();
      const S = mat3.fromScaling(mat3.create(), [factor, factor]);
      mat3.multiply(result, S, old);
      return result;
    });
  };

  return {
    viewMatrix,
    pan,
    zoom,
  };
}

export default useCamera;
