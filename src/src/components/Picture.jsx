import React from "react";
import { useDrag } from "react-dnd";

function Picture({ id, url , showModal, setShowModal, setImageUrl }) {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleMouseEnter = () => {
    setShowModal(true);
    setImageUrl(url);
  };

  const handleMouseLeave = () => {
    setShowModal(false);
    setImageUrl("");
  };

  return (
    <>
      <img
        ref={drag}
        alt={`${id}`}
        src={url}
        className={`m-1 ${isDragging ? "dragging" : ""}`}
        width="150px"
        onClick={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      />
    </>
  );
}

export default Picture;
