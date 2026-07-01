import React, { useEffect, useState } from "react";
import adminIcon from "../assets/pointing.png";
import usersIcon from "../assets/people-black.png";
import bookIcon from "../assets/book-square.png";
import userIcon from "../assets/user.png";
import { Pie } from "react-chartjs-2";
import logo_with_title from "../assets/logo-with-title-black.png";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import logo from "../assets/black-logo.png";
import { useSelector } from "react-redux";
import Header from "../layout/Header";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const quotes = [
  "Embarking on the journey of reading fosters personal growth, nurturing a path towards excellence and the refinement of character.",
  "A library is not a luxury but one of the necessities of life. — Henry Ward Beecher",
  "The only thing that you absolutely have to know, is the location of the library. — Albert Einstein",
  "Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers. — Charles William Eliot",
  "Libraries store the energy that fuels the imagination. They open up windows to the world and inspire us to explore and achieve. — Sidney Sheldon"
];

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { books } = useSelector((state) => state.book);
  const { allBorrowedBooks } = useSelector((state) => state.borrow);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalBooks, setTotalBooks] = useState((books && books.length) || 0);
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
    let numberOfUsers = users.filter((user) => user.role === "User");
    let numberOfAdmins = users.filter((user) => user.role === "Admin");

    setTotalUsers(numberOfUsers.length);
    setTotalAdmin(numberOfAdmins.length);

    let numberOfTotalBorrowedBooks = allBorrowedBooks.filter(
      (book) => book.returnDate === null
    );
    let numberOfTotalReturnedBooks = allBorrowedBooks.filter(
      (book) => book.returnDate !== null
    );
    setTotalBorrowedBooks(numberOfTotalBorrowedBooks.length);
    setTotalReturnedBooks(numberOfTotalReturnedBooks.length);
  }, [users, allBorrowedBooks]);

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
        labels: ["No Borrow History"],
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
          {/* Left Column - Pie Chart & Legend */}
          <div className="flex flex-[1.1] flex-col items-center justify-start gap-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-center">
              <h3 className="text-base font-bold text-gray-800 mb-1">Borrowing Overview</h3>
              <p className="text-xs text-gray-500">System-wide borrowing statistics</p>
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

            <div className="flex items-center p-4 w-full sm:w-[320px] xl:w-full gap-4 h-fit bg-gray-50 rounded-lg border border-gray-100 mt-2">
              <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
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

          {/* Right Column - Stats, Profile, and Quotes */}
          <div className="flex flex-[2] flex-col gap-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Stats Cards Column */}
              <div className="flex flex-col gap-4 flex-[1.2]">
                {/* User Base Card */}
                <div className="flex items-center gap-4 bg-white p-3.5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-200">
                  <div className="w-[2px] bg-black h-12"></div>
                  <div className="bg-gray-100 border border-gray-200 w-14 h-14 flex justify-center items-center rounded-lg">
                    <img src={usersIcon} alt="users-icon" className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-xl text-gray-900 leading-tight">{totalUsers}</h4>
                    <p className="text-xs text-gray-500 font-medium">Total User Base</p>
                  </div>
                </div>

                {/* Book Count Card */}
                <div className="flex items-center gap-4 bg-white p-3.5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-200">
                  <div className="w-[2px] bg-black h-12"></div>
                  <div className="bg-gray-100 border border-gray-200 w-14 h-14 flex justify-center items-center rounded-lg">
                    <img src={bookIcon} alt="books-icon" className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-xl text-gray-900 leading-tight">{totalBooks}</h4>
                    <p className="text-xs text-gray-500 font-medium">Total Book Count</p>
                  </div>
                </div>

                {/* Admin Count Card */}
                <div className="flex items-center gap-4 bg-white p-3.5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-200">
                  <div className="w-[2px] bg-black h-12"></div>
                  <div className="bg-gray-100 border border-gray-200 w-14 h-14 flex justify-center items-center rounded-lg">
                    <img src={adminIcon} alt="admins-icon" className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-xl text-gray-900 leading-tight">{totalAdmin}</h4>
                    <p className="text-xs text-gray-500 font-medium">Total Admin Count</p>
                  </div>
                </div>
              </div>

              {/* Profile Card Column */}
              <div className="flex flex-col flex-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 justify-center items-center gap-4 text-center">
                <img 
                  src={(user && user.avatar?.url) || userIcon} 
                  alt="avatar" 
                  className="rounded-full w-24 h-24 object-cover border-2 border-gray-100 shadow-sm bg-gray-50 p-1"
                />
                <div>
                  <h2 className="text-base font-bold text-gray-800">{user && user.name}</h2>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">{user && user.role}</p>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed max-w-[220px]">
                  Welcome to your admin dashboard. Here you can manage all the settings and monitor the statistics.
                </p>
              </div>
            </div>

            {/* Quotes Card */}
            <div className="bg-white p-6 text-base xl:text-lg font-medium relative rounded-xl shadow-sm flex flex-col items-center justify-center min-h-[110px] border border-gray-100">
              <h4 className="italic text-center text-gray-850 max-w-[90%] leading-relaxed font-semibold">“{quote}”</h4>
              <p className="text-gray-500 text-xs mt-3 font-semibold">~ {author}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
