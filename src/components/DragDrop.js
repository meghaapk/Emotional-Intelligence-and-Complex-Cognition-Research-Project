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

function useDropTarget(boardName, boards, setBoards, setPictureList) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => moveImageToBoard(item.id, boardName),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const moveImageToBoard = (id, targetBoardName) => {
    setBoards((prevBoards) => {
      const updatedBoards = { ...prevBoards };
      // Remove picture from all boards
      for (const board in updatedBoards) {
        updatedBoards[board] = updatedBoards[board].filter(
          (picture) => picture.id !== id
        );
      }
      // Add picture to the target board
      const picture = initialPictureList.find((picture) => picture.id === id);
      if (picture) {
        updatedBoards[targetBoardName] = [
          ...updatedBoards[targetBoardName],
          picture,
        ];
      }
      return updatedBoards;
    });

    // Update picture visibility
    setPictureList((prevList) =>
      prevList.map((p) =>
        p.id === id ? { ...p, visible: false } : p
      )
    );
  };

  return { isOver, drop };
}

function DragDrop() {
  const [pictureList, setPictureList] = useState(initialPictureList.map(picture => ({ ...picture, visible: true })));
  const [boards, setBoards] = useState({
    board1: [],
    board2: [],
    board3: [],
    board4: [],
    board5: [],
  });

  // Effect to update picture visibility when boards change
  useEffect(() => {
    setPictureList((prevList) =>
      prevList.map((picture) => ({
        ...picture,
        visible: !Object.values(boards).some(board =>
          board.some(boardPicture => boardPicture.id === picture.id)
        ),
      }))
    );
  }, [boards]);

  return (
    <>
      <div className="Pictures">
        {pictureList.map((picture) => (
          picture.visible && <Picture key={picture.id} url={picture.url} id={picture.id} />
        ))}
      </div>
      <div style={{ display: "flex" }}>
        {Object.keys(boards).map((boardName) => (
          <Board
            key={boardName}
            boardName={boardName}
            boards={boards}
            setBoards={setBoards}
            setPictureList={setPictureList}
          />
        ))}
      </div>
    </>
  );
}

function Board({ boardName, boards, setBoards, setPictureList }) {
  const { isOver, drop } = useDropTarget(boardName, boards, setBoards, setPictureList);
  return (
    <div className={`Board ${isOver ? "highlight" : ""}`} ref={drop}>
      {boards[boardName].map((picture) => (
        <Picture key={picture.id} url={picture.url} id={picture.id} />
      ))}
    </div>
  );
}

export default DragDrop;
