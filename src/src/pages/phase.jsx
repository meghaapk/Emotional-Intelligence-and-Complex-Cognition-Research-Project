import React, { useState, useEffect } from "react";
import Picture from "../components/Picture";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

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
  const [imageUrl, setImageUrl] = useState(initialPictureList[0].url);
  const [showModal, setShowModal] = useState(false);
  const [start, setStart] = useState(true);
  const [description, setDescription] = useState("");
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

  useEffect(() => {
    if (start) {
      // Set firstTime to false after 5 seconds
      const timeout = setTimeout(() => {
        setStart(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [start]);

  const onDone = () => {
    const avgScore = Object.values(score).reduce((acc, curr) => acc + curr, 0) / initialPictureList.length;
    setPhaseScore(avgScore);
    setStart(true);
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
      <h1 className='text-center text-5xl'>Emotional Intelligence And Complex Cognition Research</h1>
      {start ?(
        <div className={start ? "fade-out text-center text-3xl flex flex-col gap-5 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold" : ""}>
          <h1 className="text-5xl">Phase {phase}</h1>
        </div>
      ) : (
        <>
          <h1 className="text-center text-3xl mt-5">Phase {phase}</h1>
          <p className="text-center">Drag and drop the below images</p>
          <Modal show={showModal} onClose={() => setShowModal(false)} url={imageUrl} description={description} />
          {showDone && <div onClick={onDone} className="px-5 py-1 bg-green-500 w-fit mx-auto my-5">Done -{">"}</div>}
          <div className="flex flex-row flex-wrap items-center px-10 w-11/12 mx-auto">
            {pictureList.map((picture) => (
              picture.visible && <Picture key={picture.id} url={picture.url} 
              id={picture.id} 
              showModal={showModal} 
              setShowModal={setShowModal} 
              setImageUrl={setImageUrl} 
              description={picture.description ? picture.description : ""}
              setDescription={setDescription}
            />
            ))}
          </div>
          <div className="flex flex-row justify-evenly mt-4">
            {phase === "1" && (
              <>
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
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setImageUrl={setImageUrl}
                  />
                ))}
              </>
            )}
            {phase === "2" && (
              <>
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
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setImageUrl={setImageUrl}
                  />
                ))}
              </>
            )}
            {phase === "3" && (
              <>
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
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setImageUrl={setImageUrl}
                  />
                ))}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

function Board({ boardName, boards, setBoards, setPictureList, setScore, score, initialPictureList , showModal, setShowModal, setImageUrl}) {
  const { isOver, drop } = useDropTarget(boardName, boards, setBoards, setPictureList, setScore, initialPictureList);

  return (
    <div className="flex flex-col">
      <div className={`border-solid border-2 p-5 min-w-64 min-h-80 flex-wrap`} ref={drop}>
        {boards[boardName].map((picture) => (
          <Picture key={picture.id} url={picture.url} id={picture.id} showModal={showModal} setShowModal={setShowModal} setImageUrl={setImageUrl} description={picture.description}/>
        ))}
      </div>
    </div>
  );
}

export default DragDrop;
