import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragDrop from "./components/DragDrop";
import Image1 from "./Images/Img1.png"; // Importing images
import Image2 from "./Images/Img2.png";
import Image3 from "./Images/Img3.png";
import Image4 from "./Images/Img4.png";
import Image5 from "./Images/Img5.png";
import Image6 from "./Images/Img6.png";
import Image7 from "./Images/Img7.png";
import Image8 from "./Images/Img8.png";
import Image9 from "./Images/Img9.png";
import Image10 from "./Images/Img10.png";
import Image11 from "./Images/Img11.png";
import Image12 from "./Images/Img12.png";
import Image13 from "./Images/Img13.png";
import Image14 from "./Images/Img14.png";
import Image15 from "./Images/Img15.png";
import { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// Initial list of pictures with their IDs and URLs
const phase1list = [
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
const phase2list = [
  { id: 1, url: Image1 },
  { id: 2, url: Image2 },
  { id: 3, url: Image3 },
  { id: 4, url: Image4 },
  { id: 5, url: Image5 },
  { id: 6, url: Image6 },
  { id: 7, url: Image7 },
  { id: 8, url: Image8 },
  { id: 9, url: Image9 },
];

const phase3list = [
  { id: 10, url: Image10 },
  { id: 11, url: Image11 },
  { id: 12, url: Image12 },
  { id: 13, url: Image13 },
  { id: 14, url: Image14 },
  { id: 15, url: Image15 },
];
function App() {
  const [phase1score, setPhase1Score] = useState(0);
  const [phase2score, setPhase2Score] = useState(0);
  const [phase3score, setPhase3Score] = useState(0);
  useEffect(() => {
    console.log(phase1score);
  }, [phase1score]);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<DragDrop phase="1" initialPictureList={phase1list} setPhaseScore={setPhase1Score}/>} />
            <Route exact path='/phase2' element={<DragDrop phase="1" initialPictureList={phase2list} setPhaseScore={setPhase2Score}/>} />
            <Route exact path='/phase3' element={<DragDrop phase="1" initialPictureList={phase3list} setPhaseScore={setPhase3Score}/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </DndProvider>
  );
}

export default App;
