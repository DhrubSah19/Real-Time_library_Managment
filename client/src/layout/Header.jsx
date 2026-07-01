import React, { useEffect, useState } from "react";
import settingIcon from "../assets/setting.png";
import userIcon from "../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleSettingPopup } from "../store/slices/popUpSlice";



const Header = () => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  

  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date(); 

      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";   
      setCurrentTime(`${hours}:${minutes} ${ampm}`);
      
      const options = { month: "short", day: "numeric", year: "numeric" };
      setCurrentDate(now.toLocaleDateString("en-US", options));
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <header className="absolute top-0 bg-white w-full py-3 px-6 shadow-sm border-b border-gray-100 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-2 rounded-full border border-gray-200">
            <img src={userIcon} alt="userIcon" className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold text-gray-800">{user && user.name}</span>
            <span className="text-[10px] text-gray-500 font-medium">{user && user.role}</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 mr-2">
          <div className="flex flex-col items-end text-right">
            <span className="text-sm font-bold text-gray-850">{currentTime}</span>
            <span className="text-[11px] text-gray-500 font-medium mt-0.5">{currentDate}</span>
          </div>
          <span className="bg-gray-200 h-9 w-[1px]"/>
          <button 
            onClick={() => dispatch(toggleSettingPopup())}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none"
          >
            <img src={settingIcon} alt="settingIcon" className="w-6 h-6 hover:rotate-45 transition-transform duration-300" />
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
