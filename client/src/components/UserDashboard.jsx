import React, { useEffect, useState } from "react";
import logo_with_title from "../assets/logo-with-title-black.png";
import returnIcon from "../assets/redo.png";
import browseIcon from "../assets/pointing.png";
import bookIcon from "../assets/book-square.png";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useSelector } from "react-redux";
import Header from "../layout/Header";

// ✅ Only register required elements for Pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

const quotes = [
  "A room without books is like a body without a soul. — Marcus Tullius Cicero",
  "Reading is to the mind what exercise is to the body. — Joseph Addison",
  "Today a reader, tomorrow a leader. — Margaret Fuller",
  "Books are a uniquely portable magic. — Stephen King",
  "There is no friend as loyal as a book. — Ernest Hemingway",
  "Reading gives us someplace to go when we have to stay where we are. — Mason Cooley",
  "Libraries store the energy that fuels the imagination. — Sidney Sheldon"
];

const UserDashboard = () => {
  const { settingPopup } = useSelector((state) => state.popup);
  const { userBorrowedBooks } = useSelector((state) => state.borrow);

  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const selected = quotes[Math.floor(Math.random() * quotes.length)];
    const parts = selected.split(" — ");
    setQuote(parts[0]);
    setAuthor(parts[1] || "BookWorm Team");
  }, []);

  useEffect(() => {
    let numberOfTotalBorrowedBooks = userBorrowedBooks.filter(
      (book) => book.returned === false
    );
    let numberOfTotalReturnedBooks = userBorrowedBooks.filter(
      (book) => book.returned === true
    );
    setTotalBorrowedBooks(numberOfTotalBorrowedBooks.length);
    setTotalReturnedBooks(numberOfTotalReturnedBooks.length);
  }, [userBorrowedBooks]);

  const hasData = totalBorrowedBooks > 0 || totalReturnedBooks > 0;

  const data = hasData
    ? {
        labels: ["Total Borrowed Books", "Total Returned Books"],
        datasets: [
          {
            data: [totalBorrowedBooks, totalReturnedBooks],
            backgroundColor: ["#3D3E3E", "#151619"],
            hoverOffset: 4,
          },
        ],
      }
    : {
        labels: ["No Books Borrowed Yet"],
        datasets: [
          {
            data: [1],
            backgroundColor: ["#E5E7EB"],
            hoverOffset: 0,
          },
        ],
      };

  return (
    <>
      <main className="relative flex-1 pt-24 pb-6 px-4 md:px-6 lg:px-8 overflow-y-auto">
        <Header />

        <div className="flex flex-col xl:flex-row gap-6 xl:gap-8 mt-4">
          {/* Left Side */}
          <div className="flex flex-[1.5] flex-col gap-5">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition">
                <div className="w-[2px] bg-black h-12"></div>
                <div className="bg-gray-100 border border-gray-200 w-14 h-14 flex justify-center items-center rounded-lg">
                  <img src={bookIcon} alt="book-icon" className="w-6 h-6" />
                </div>
                <p className="text-lg font-semibold text-gray-800">Your Borrowed Book List</p>
              </div>

              <div className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition">
                <div className="w-[2px] bg-black h-12"></div>
                <div className="bg-gray-100 border border-gray-200 w-14 h-14 flex justify-center items-center rounded-lg">
                  <img src={returnIcon} alt="return-icon" className="w-6 h-6" />
                </div>
                <p className="text-lg font-semibold text-gray-800">Your Returned Book List</p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition w-full">
                <div className="w-[2px] bg-black h-12"></div>
                <div className="bg-gray-100 border border-gray-200 w-14 h-14 flex justify-center items-center rounded-lg">
                  <img src={browseIcon} alt="browse-icon" className="w-6 h-6" />
                </div>
                <p className="text-lg font-semibold text-gray-800">Let’s Browse Book Inventory</p>
              </div>

              <img
                src={logo_with_title}
                alt="logo"
                className="hidden lg:block w-auto h-14 object-contain"
              />
            </div>

            <div className="bg-white p-5 text-base xl:text-lg font-medium relative rounded-xl shadow-sm flex flex-col items-center justify-center min-h-[90px] border border-gray-100">
              <h4 className="italic text-center text-gray-800">“{quote}”</h4>
              <p className="text-gray-500 text-xs mt-2 font-semibold">~ {author}</p>
            </div>
          </div>

          {/* Right Side Pie Chart */}
          <div className="flex-[1.1] flex flex-col items-center justify-center gap-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-center">
              <h3 className="text-base font-bold text-gray-800 mb-1">Your Book Statistics</h3>
              <p className="text-xs text-gray-500">Visual overview of your borrowing activity</p>
            </div>

            <div className="w-[200px] h-[200px] relative flex items-center justify-center">
              <Pie
                data={data}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      enabled: hasData,
                    },
                  },
                }}
              />
              {!hasData && (
                <div className="absolute text-center">
                  <span className="text-xs font-semibold text-gray-400 block">No Data</span>
                  <span className="text-[10px] text-gray-400 block">0 Books</span>
                </div>
              )}
            </div>

            <div className="flex items-center p-4 w-full sm:w-[320px] xl:w-full gap-4 h-fit bg-gray-50 rounded-lg border border-gray-100">
              <img src={logo_with_title} alt="logo" className="w-auto h-10" />
              <span className="w-[1px] bg-gray-300 h-10"></span>
              <div className="flex flex-col gap-1.5">
                <p className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3D3E3E]"></span>
                  <span>Total Borrowed: {totalBorrowedBooks}</span>
                </p>

                <p className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#151619]"></span>
                  <span>Total Returned: {totalReturnedBooks}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserDashboard;
