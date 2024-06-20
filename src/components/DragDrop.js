import React, { useState, useEffect } from "react";
import Picture from "./Picture";
import { useDrop } from "react-dnd";
import "../App.css";
import { useNavigate } from "react-router-dom";

// Custom hook for creating drop targets
function useDropTarget(boardName, boards, setBoards, setPictureList, setScore, initialPictureList) {
  // Setting up the drop target
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image", // Accepting items of type 'image'
    drop: (item) => moveImageToBoard(item.id, boardName, initialPictureList), // Handling drop event
    collect: (monitor) => ({
      isOver: !!monitor.isOver(), // Collecting whether the item is over the target
    }),
  }));

  let sourceBoardName

  // Function to move an image to a specified board
  const moveImageToBoard = (id, targetBoardName, initialPictureList) => {
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

function DragDrop({ initialPictureList, setPhaseScore, phase }) {
  const [pictureList, setPictureList] = useState([]);
  const [showDone, setShowDone] = useState(false);
  const navigate = useNavigate();
  
  
  // State to manage the pictures in each board

  // State to manage the pictures in each board
  const [boards, setBoards] = useState({
    board1: [],
    board2: [],
    board3: [],
    board4: [],
    board5: [],
  });

  const [score, setScore] = useState({
    board1: 0,
    board2: 0,
    board3: 0,
    board4: 0,
    board5: 0,
  });

  useEffect(() => {
    setPictureList(initialPictureList.map(picture => ({ ...picture, visible: true })));
    setBoards({
      board1: [],
      board2: [],
      board3: [],
      board4: [],
      board5: [],
    });
    setScore({
      board1: 0,
      board2: 0,
      board3: 0,
      board4: 0,
      board5: 0,
    });
    setShowDone(false);
  }, [initialPictureList, phase]);

  const onDone = () => {
    const avgScore = Object.values(score).reduce((acc, curr) => acc + curr, 0) / initialPictureList.length;
    setPhaseScore(avgScore);
    if(phase >= "3")  navigate(`/result`);
    else navigate(`/phase${parseInt(phase) + 1}`);
  };

  useEffect(() => {
    if (Object.values(boards).flat().length === initialPictureList.length) {
      setShowDone(true);
    }
  }, [boards, initialPictureList.length]);

  return (
    <>
      <div>Phase {phase}</div>
      {showDone && <div onClick={onDone}>Done</div>}
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
            initialPictureList={initialPictureList}
          />
        ))}
      </div>
    </>
  );
}

function Board({ boardName, boards, setBoards, setPictureList, setScore, score, initialPictureList }) {
  const { isOver, drop } = useDropTarget(boardName, boards, setBoards, setPictureList, setScore, initialPictureList);

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

export default DragDrop;
