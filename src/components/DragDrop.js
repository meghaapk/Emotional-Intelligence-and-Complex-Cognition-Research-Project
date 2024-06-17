import React, { useState, useEffect } from "react";
import Picture from "./Picture"; // Component to display individual pictures
import { useDrop } from "react-dnd"; // Hook for drag-and-drop functionality
import "../App.css"; // Importing styles
import Image1 from "../Images/Img1.png"; // Importing images
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

// Initial list of pictures with their IDs and URLs
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

// Custom hook for creating drop targets
function useDropTarget(boardName, boards, setBoards, setPictureList, setScore) {
  // Setting up the drop target
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image", // Accepting items of type 'image'
    drop: (item) => moveImageToBoard(item.id, boardName), // Handling drop event
    collect: (monitor) => ({
      isOver: !!monitor.isOver(), // Collecting whether the item is over the target
    }),
  }));

  let sourceBoardName

  // Function to move an image to a specified board
  const moveImageToBoard = (id, targetBoardName) => {
    setBoards((prevBoards) => {
      const updatedBoards = { ...prevBoards };
      // find the borad that the picture is in
      sourceBoardName = Object.keys(prevBoards).find((board) =>
        prevBoards[board].some((picture) => picture.id === id)
      );
      console.log(sourceBoardName);
      // Remove picture from all boards
      for (const board in updatedBoards) {
        updatedBoards[board] = updatedBoards[board].filter((picture) => picture.id !== id);
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

    // Update picture visibility in the main list
    setPictureList((prevList) =>
      prevList.map((p) =>
        p.id === id ? { ...p, visible: false } : p
      )
    );

    // extract board number from the board name
    const targetBoardNumber = parseInt(targetBoardName.match(/\d+/)[0]);
    // if sourceBoardName is undefined, then the picture is coming from the main list and not from any board score should not be updated
    const sourceBoardNumber = parseInt(sourceBoardName?.match(/\d+/)[0]);
    if (sourceBoardName) {
      // Update the score for the source board
      setScore((prevScore) => ({
        ...prevScore,
        [sourceBoardName]: prevScore[sourceBoardName] - sourceBoardNumber,
        [targetBoardName]: prevScore[targetBoardName] + targetBoardNumber,
      }));
    } else {
      setScore((prevScore) => ({
        ...prevScore,
        [targetBoardName]: prevScore[targetBoardName] + targetBoardNumber,
      }));
    }
  };

  return { isOver, drop };
}

function DragDrop() {
  // State to manage the list of pictures, including their visibility
  const [pictureList, setPictureList] = useState(initialPictureList.map(picture => ({ ...picture, visible: true })));
  
  // State to manage the pictures in each board
  const [boards, setBoards] = useState({
    board1: [],
    board2: [],
    board3: [],
    board4: [],
    board5: [],
  });

  // State to manage the score for each board
  const [score, setScore] = useState({
    board1: 0,
    board2: 0,
    board3: 0,
    board4: 0,
    board5: 0,
  });

  // Effect to update picture visibility when the boards change
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
            setScore={setScore}
            score={score[boardName]}
          />
        ))}
      </div>
    </>
  );
}

function Board({ boardName, boards, setBoards, setPictureList, setScore, score }) {
  // Using the custom hook to create a drop target for each board
  const { isOver, drop } = useDropTarget(boardName, boards, setBoards, setPictureList, setScore);
  
  return (
    <div className="flex flex-column">
    <div className={`Board ${isOver ? "highlight" : ""}`} ref={drop}>
      {boards[boardName].map((picture) => (
        <Picture key={picture.id} url={picture.url} id={picture.id} />
      ))}
    </div>
    <p>{score}</p>
    </div>
  );
}

export default DragDrop;