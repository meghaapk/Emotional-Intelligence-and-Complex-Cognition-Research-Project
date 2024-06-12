import React from "react";
import { useDrag } from "react-dnd";

function Picture({ id, url, visible}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <img
      ref={drag}
      alt="img"
      src={url}
      width="150px"
      style={{ border: isDragging ? "5px solid pink" : "0px" }}
    />
  );
}

export default Picture;
