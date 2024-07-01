import { useState } from "react";
function Modal({ show, onClose, url, description }) {
  const [showStories, setShowStories] = useState(false)
  const handleStories = (e) => {
    e.stopPropagation()
    if(description) {
      console.log('description', description);
      setShowStories(!showStories)
    }
    console.log('handleStories');
  }
  return (
    <>
      {show && ( // Render the modal only if the show prop is true}
        <div className="w-full h-full z-10 fixed top-0 left-0 bg-black/75">
          <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit scale-150 bg-white p-2 rounded-xl" onClick={handleStories}>
            <p onClick={onClose} className="ml-auto text-sm w-fit">X</p>
            {!showStories && (
              <img src={url} alt={url} className="w-full h-full" />
            )}
            {showStories && (
              <p className="text-black">{description}</p>
            )}
          </div>
        </div>
      )}
      {/* {show && description && (
        <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit scale-150" onClick={handleStories}>
          <p onClick={onClose} className="text-white ml-auto w-fit">X</p>
          <p className="text-white">{description}</p>
        </div>
      )} */}
    </>
  );
}

export default Modal;
