import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import { Button } from "primereact/button";

function SingleEvent() {
  const [event, setEvent] = useState(null);
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [bookLoading, setBookLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const getUserInfo = async (token) => {
    try {
      setBookLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BASE_HOST_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        setUserData(response.data.data.user);
      }
    } catch (error) {
      navigate("/auth/login");
    } finally {
      setBookLoading(false);
    }
  };
  const getEvent = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_HOST_URL}/events/${id}`
      );
      if (response.data) {
        setEvent(response.data.data.event);
      }
    } catch (error) {
      navigate("/");
    }
  };

  const book = async () => {
    if (!userData) navigate("/auth/login");
    try {
      setBookLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_HOST_URL}/events/${event._id}/book`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Areeb-token")}`,
          },
        }
      );
      if (res.data) {
        window.location.reload();
      }
    } catch (error) {
      setError("*" + error.response.data.message);
    } finally {
      setBookLoading(false);
    }
  };

  const deleteEvent = async () => {
    try {
      setDeleteLoading(true);
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_HOST_URL}/events/${event._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Areeb-token")}`,
          },
        }
      );
      if (res.status === 204) {
        navigate("/");
      }
    } catch (error) {
      setError("*" + error.response.data.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    getEvent(id);
    getUserInfo(localStorage.getItem("Areeb-token"));
  }, []);

  useEffect(() => {
    if (event?.participants && userData?._id) {
      const isBooked = event.participants.some(
        (participantId) => String(participantId) === String(userData._id)
      );
      if (isBooked !== booked) {
        setBooked(isBooked);
      }
    }
  }, [event, userData, booked]);

  if (!event || !userData) {
    return <Loader />;
  }
  const formattedDate = new Date(event.date).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <div className="relative">
        <div className="w-full h-96 overflow-hidden rounded-lg">
          <img
            src={event.images[0]}
            alt={event.name}
            className="w-full h-full object-cover"
          />
        </div>
        {event.images.length > 1 && (
          <div className="absolute bottom-4 right-4 flex space-x-2">
            {event.images.slice(1).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Event thumbnail ${index + 2}`}
                className="w-20 h-20 object-cover rounded-md border-2 border-white"
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <span className="text-red-500 text-sm">{error}</span>
        <h1 className="text-3xl font-bold text-gray-800">{event.name}</h1>
        <p className="text-sm text-gray-500 mt-1">Category: {event.category}</p>
        <p className="text-lg text-gray-700 mt-4">{event.description}</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Date & Time</h2>
            <p className="text-gray-600">{formattedDate}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Venue</h2>
            <p className="text-gray-600">{event.venue}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Price</h2>
            <p className="text-gray-600">${event.price.toFixed(2)}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Participants</h2>
            <p className="text-gray-600">{event.participants.length} attendees</p>
            <p className="text-sm text-gray-500">
              User IDs: {event.participants.join(", ")}
            </p>
          </div>
        </div>

        <div className="mt-8 flex  justify-between items-center">
          <Button
            disabled={booked}
            onClick={book}
            loading={bookLoading}
            label={booked ? "Booked" : "Register Now"}
            className={`${
              booked ? "bg-amber-500" : "bg-blue-600"
            } py-2 px-5 rounded-2xl text-white font-medium cursor-pointer border-0`}
          ></Button>

          <Button
            label="Delete  ِ"
            loading={deleteLoading}
            className="bg-red-500 text-white px-5 py-2  rounded-xl cursor-pointer border-0"
            onClick={deleteEvent}
          >
            <span className="text-[10px]">Admin Only</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
export default SingleEvent;
