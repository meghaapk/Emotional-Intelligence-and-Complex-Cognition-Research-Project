import React, { useState, useEffect } from "react";
import Picture from "./Picture";
import { useDrop } from "react-dnd";
import "../App.css";
import Image1 from "../Images/Img1.png";
import Image2 from "../Images/Img2.png";
import Image3 from "../Images/Img3.png";
import Image4 from "../Images/Img4.png";
import Image5 from "../Images/Img5.png";
import Image6 from "../Images/Img6.png";
import Image7 from "../Images/Img7.png";
import Image8 from "../Images/Img8.png";
import Image9 from "../Images/Img9.png";
import Image10 from "../Images/Img10.png";
import Image11 from "../Images/Img11.png";
import Image12 from "../Images/Img12.png";
import Image13 from "../Images/Img13.png";
import Image14 from "../Images/Img14.png";
import Image15 from "../Images/Img15.png";

const initialPictureList = [
  { id: 1, url: Image1 },
  { id: 2, url: Image2 },
  { id: 3, url: Image3 },
  { id: 4, url: Image4 },
  { id: 5, url: Image5 },
  { id: 6, url: Image6 },
  { id: 7, url: Image7 },
  { id: 8, url: Image8 },
  { id: 9, url: Image9 },
  { id: 10, url: Image10 },
  { id: 11, url: Image11 },
  { id: 12, url: Image12 },
  { id: 13, url: Image13 },
  { id: 14, url: Image14 },
  { id: 15, url: Image15 },
];

function useDropTarget(pictureList, setPictureList) {
  const [board, setBoard] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    const picture = pictureList.find((picture) => picture.id === id);
    if (picture) {
      setBoard((prevBoard) => {
        console.log(prevBoard);
        if (!prevBoard.some((boardPicture) => boardPicture.id === id)) {
          setPictureList((prevList) =>
            prevList.map((p) =>
              p.id === id ? { ...p, visible: false } : p
            )
          );
          return [...prevBoard, picture];
        }
        return prevBoard;
      });
    }
  };

  return { board, drop };
}

function DragDrop() {
  const [pictureList, setPictureList] = useState(initialPictureList.map(picture => ({ ...picture, visible: true })));

  return (
    <>
      <div className="Pictures">
        {pictureList.map((picture) => (
          picture.visible && <Picture key={picture.id} url={picture.url} id={picture.id} />
        ))}
      </div>
      <div style={{ display: "flex" }}>
        <Board key={'board1'} boardName={'board1'} pictureList={pictureList} setPictureList={setPictureList} />
        <Board key={'board2'} boardName={'board2'} pictureList={pictureList} setPictureList={setPictureList} />
        <Board key={'board3'} boardName={'board3'} pictureList={pictureList} setPictureList={setPictureList} />
        <Board key={'board4'} boardName={'board4'} pictureList={pictureList} setPictureList={setPictureList} />
        <Board key={'board5'} boardName={'board5'} pictureList={pictureList} setPictureList={setPictureList} />
      </div>
    </>
  );
}

function Board({ boardName, pictureList, setPictureList }) {
  const { board, drop } = useDropTarget(pictureList, setPictureList);
  return (
    <div className="Board" ref={drop}>
      {board.map((picture) => (
        <Picture key={picture.id} url={picture.url} id={picture.id} />
      ))}
    </div>
  );
}

export default DragDrop;
