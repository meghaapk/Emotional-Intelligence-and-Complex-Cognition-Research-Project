import React, { useState } from "react";
import { useDrag } from "react-dnd";
import Modal from "./Modal"; // Make sure to import the Modal component

function Picture({ id, url }) {
  const [showModal, setShowModal] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleMouseEnter = () => {
    setShowModal(true);
  };

  const handleMouseLeave = () => {
    setShowModal(false);
  };

  return (
    <>
      <img
        ref={drag}
        alt={`Image ${id}`}
        src={url}
        className={`picture ${isDragging ? "dragging" : ""}`}
        width="150px"
        onClick={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <Modal show={showModal} onClose={handleMouseLeave} url={url} />
    </>
  );
}

export default Picture;
