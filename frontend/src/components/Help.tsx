
import React, { useEffect, useRef } from "react";
const Help = (props) => {
    if (props.isAutoOpen) {
        useEffect(() => {
            document.getElementById("my_modal_6").checked = true;
          }, []);
    }
    
  return (
    <div>
       {/* The button to open modal */}
        <label htmlFor="my_modal_6" className="btn">?</label>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal">
        <div className="modal-box">
            <h2 className="font-bold mb-5 ">How to Play:</h2>
            <ul>
                <li>Find the bug by clicking on the correct word or character in the code snippet and selecting the correct option</li>
                <li>Clicking the wrong options or wrong area will cause you to loose a start so be careful!</li>
                <li>If you can't see an option you were expecting you can always change your selection by clicking the 'x'. This may happen 
                    when a bug is in the middle of a line. 
                </li>
                <li>Click the run button at the bottom to see the error message or program output (the puzzle title does not have a line number)</li>
                <li>You can open this dialog by clicking the ? in the top right corner</li>
            </ul>
           
            <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">Lets Debug!</label>
            </div>
        </div>
        </div>
    </div>
    );
};

export default Help;
