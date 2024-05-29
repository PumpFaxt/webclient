import React, { useEffect, useRef, useState } from "react";
import { getCoords } from "../utils";

export default function useRect(
  element?: React.MutableRefObject<HTMLElement> | undefined,
  dependancyList?: any[]
) {
  const [pos, setPos] = useState<DOMRect>({} as DOMRect);
  const flag = useRef(false);

  useEffect(() => {
    if (!flag.current && element && element.current) {
      setPos(element.current.getBoundingClientRect());
      flag.current = true;
    }
  }, [flag, element, ...(dependancyList || [])]);

  return pos;
}
