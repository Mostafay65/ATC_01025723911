import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "primereact/button";
const EventCard = ({ event, user }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bookLoading, setBookLoading] = useState(false);
  const [booked, setBooked] = useState(event.participants.includes(user?._id || false));
  const navigate = useNavigate();

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? event.images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === event.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const book = async () => {
    if (!user) navigate("/auth/login");
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
      
    } finally {
      setBookLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="h-48 overflow-hidden rounded-2xl relative group">
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200 w-8 h-8 rounded-[50%] opacity-0 group-hover:opacity-100 hover:shadow-md hover:scale-105 duration-500 border border-gray-400 z-10"
        >
          <SlArrowLeft className="mx-auto" />
        </button>
        <img src={event.images[currentIndex]} alt="" className="" />
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 w-8 h-8 rounded-[50%] opacity-0 group-hover:opacity-100 hover:shadow-md hover:scale-105 duration-500 border border-gray-400 z-10"
        >
          <SlArrowRight className="mx-auto" />
        </button>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold">{event.name}</h3>
        <p className="text-sm text-gray-500">{event.description}</p>
      </div>
      <div className="flex  justify-center gap-4">
        <Link
          to={`/events/${event._id}`}
          className="bg-blue-400 p-3 rounded-lg text-white font-medium"
        >
          show details
        </Link>
        <Button
          disabled={booked}
          onClick={book}
          loading={bookLoading}
          label={booked ? "Booked" : "Book Now"}
          className={`${
            booked ? "bg-amber-500" : "bg-blue-600"
          } p-3 rounded-lg text-white font-medium cursor-pointer border-0`}
        ></Button>
      </div>
    </div>
  );
};

export default EventCard;
