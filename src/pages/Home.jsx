import React, { useState,useEffect } from "react";
import { SketchPicker } from "react-color";
import { format } from "date-fns";
const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  const dayformat = format(new Date(),'dd-MMMM-yyyy')
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <h1 className=" font-extrabold text-transparent text-9xl md:text-[200px] bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{currentTime.toLocaleTimeString()}</h1>
      <h1 className=" px-10 font-extrabold text-transparent text-lg  bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-600">{dayformat}</h1>
    </div>
  );
};

export default Home;
