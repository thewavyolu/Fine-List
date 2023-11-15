import React, { useState,useEffect, useRef,useLayoutEffect,memo} from 'react';
import Fines from "./components/Fines/Fines" 
//import './App.css';
 


function App() {
  const[fieldData, setFieldData] = useState([]); 
 


  return (
    <div className="App">
      <Fines />
    </div>
  );
}

export default App;
