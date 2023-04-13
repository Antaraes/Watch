import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";

function WorldClock() {
  const [selectedCountry, setSelectedCountry] = useState(countries);
  const [clocks, setClocks] = useState([]);

  const handleAddClock = () => {
    if (selectedCountry) {
      setClocks([...clocks, selectedCountry]);
    }
  };

  const handleDeleteClock = (index) => {
    setClocks(clocks.filter((_, i) => i !== index));
  };
  
  return (
    <div className=" w-full ">
      <div className="flex justify-end items-end my-5 mx-5">
        <select
          className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-44"
          onChange={(event) => setSelectedCountry(event.target.value)}
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option value={country.zone} key={country.code}>
              {country.name}
            </option>
          ))}
        </select>
        <button
          className="bg-[#03C988] text-black active:bg-[#B6EADA] font-bold uppercase text-sm px-6 py-3 mx-5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          onClick={handleAddClock}
        >
          Add Clock
        </button>
      </div>
      <div className="">
        <table className="w-full text-lg text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 h-10">
            <tr>
              <th>Country</th>
              <th>Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clocks.map((clock, index) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 h-10"
                key={clock.zone}
              >
                <td>{clock}</td>
                <td>{DateTime.now().setZone(clock.zone).toLocaleString(DateTime.TIME_SIMPLE)}</td>
                <td>
                  <button onClick={() => handleDeleteClock(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const countries = [
  { code: "US", name: "United States", zone: "America/New_York" },
  { code: "GB", name: "United Kingdom", zone: "Europe/London" },
  { code: "JP", name: "Japan", zone: "Asia/Tokyo" },
  { code: "IN", name: "India", zone: "Asia/Kolkata" },
  // add more countries here...
];

export default WorldClock;
