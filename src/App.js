import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
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
import Image16 from "./Images/Img16.png";
import Image17 from "./Images/Img17.png";
import Image18 from "./Images/Img18.png";
import Image19 from "./Images/Img19.png";
import Image20 from "./Images/Img20.png";
import Image21 from "./Images/Img21.png";
import Image22 from "./Images/Img22.png";
import Image23 from "./Images/Img23.png";
import Image24 from "./Images/Img24.png";
import Image25 from "./Images/Img25.png";
import Image26 from "./Images/Img26.png";
import Image27 from "./Images/Img27.png";
import Image28 from "./Images/Img28.png";
import Image29 from "./Images/Img29.png";
import Image30 from "./Images/Img30.png";
import Image31 from "./Images/Img31.png";
import Image32 from "./Images/Img32.png";
import Image33 from "./Images/Img33.png";
import Image34 from "./Images/Img34.png";
import Image35 from "./Images/Img35.png";
import Image36 from "./Images/Img36.png";
import Image37 from "./Images/Img37.png";
import Image38 from "./Images/Img38.png";
import Image39 from "./Images/Img39.png";
import Image40 from "./Images/Img40.png";
import Image41 from "./Images/Img41.png";
import Image42 from "./Images/Img42.png";
import Image43 from "./Images/Img43.png";
import Image44 from "./Images/Img44.png";
import Image45 from "./Images/Img45.png";
import Home from "./components/Home";

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
  { id: 16, url: Image16 },
  { id: 17, url: Image17 },
  { id: 18, url: Image18 },
  { id: 19, url: Image19 },
  { id: 20, url: Image20 },
  { id: 21, url: Image21 },
  { id: 22, url: Image22 },
  { id: 23, url: Image23 },
  { id: 24, url: Image24 },
  { id: 25, url: Image25 },
  { id: 26, url: Image26 },
  { id: 27, url: Image27 },
  { id: 28, url: Image28 },
  { id: 29, url: Image29 },
  { id: 30, url: Image30 },
  { id: 31, url: Image31 },
  { id: 32, url: Image32 },
  { id: 33, url: Image33 },
  { id: 34, url: Image34 },
  { id: 35, url: Image35 },
];

const phase3list = [
  { 
    id: 36, 
    url: Image36 , 
    description : "This is a description for image 36",
  },
  { id: 37, url: Image37 ,
    description : "This is a description for image 36",},
  { id: 38, url: Image38 ,
    description : "This is a description for image 36",},
  { id: 39, url: Image39 ,
    description : "This is a description for image 36",},
  { id: 40, url: Image40 ,
    description : "This is a description for image 36",},
  { id: 41, url: Image41 ,
    description : "This is a description for image 36",},
  { id: 42, url: Image42,
    description : "This is a description for image 36", },
  { id: 43, url: Image43 ,
    description : "This is a description for image 36",},
  { id: 44, url: Image44,
    description : "This is a description for image 36", },
  { id: 45, url: Image45,
    description : "This is a description for image 36", },
];

function App() {
  const [phase1score, setPhase1Score] = useState(0);
  const [phase2score, setPhase2Score] = useState(0);
  const [phase3score, setPhase3Score] = useState(0);

  useEffect(() => {
    console.log('Phase 1 Score:', phase1score);
    console.log('Phase 2 Score:', phase2score);
    console.log('Phase 3 Score:', phase3score);
  }, [phase3score, phase2score, phase1score]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Home/>}
            />
            <Route
              path="/phase1"
              element={
                <DragDrop
                  phase="1"
                  initialPictureList={phase1list}
                  setPhaseScore={setPhase1Score}
                />
              }
            />
            <Route
              path="/phase2"
              element={
                <DragDrop
                  phase="2"
                  initialPictureList={phase2list}
                  setPhaseScore={setPhase2Score}
                />
              }
            />
            <Route
              path="/phase3"
              element={
                <DragDrop
                  phase="3"
                  initialPictureList={phase3list}
                  setPhaseScore={setPhase3Score}
                />
              }
            />
            <Route
              path="/result"
              element={
                <div>
                  <h1>Results</h1>
                  <p>Phase 1 Score: {phase1score}</p>
                  <p>Phase 2 Score: {phase2score}</p>
                  <p>Phase 3 Score: {phase3score}</p>
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </DndProvider>
  );
}

export default App;
