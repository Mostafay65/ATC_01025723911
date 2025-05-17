import { useEffect, useState } from "react";
import EventCard from "../Components/Events/EventCard";
import Loader from "../Components/Loader/Loader";
import axios from "axios";
import { Link } from "react-router-dom";
import EventPagination from "../Components/Events/EventPagination";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate(); 
  const [events, setEvents] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const size = 4;

  useEffect(() => {
    const getUserInfo = async (token) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_HOST_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data) {
          setUserData(response.data.data.user);
        }
      } catch (error) {
        navigate("/auth/login");
      }
    };
    const getEvents = async () => {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BASE_HOST_URL}/events?page=${page}&limit=${size}`
      );
      const data = await res.json();
      setEvents(data.data.events);
      setLoading(false);
      setTotalRecords(data.total);
    };
    getUserInfo(localStorage.getItem("Areeb-token"));
    getEvents();
  }, [page]);
  return (
    <>
      {loading && <Loader />}
      {!loading && events.length > 0 && userData && (
        <>
          <div className="flex justify-end mx-15 mt-15">
            <Link
              to={userData.role.includes("ADMIN") ? "/createevent" : "/"}
              className="bg-sky-800 text-white px-5 py-2  rounded-xl"
            >
              Create Event <span className="text-[10px]">Admin Only</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 m-10">
            {events.map((event) => (
              <EventCard key={event._id} event={event} user={userData} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <EventPagination
              totalRecords={totalRecords}
              onPageChange={(newPage) => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
                setPage(newPage);
              }}
              rows={size}
              current={page}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
