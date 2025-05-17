import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "primereact/button";

const CreateEvent = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    date: "",
    images: [],
    venue: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      const validFiles = Array.from(files).filter((file) => file.size <= 5 * 1024 * 1024);
      if (validFiles.length > 5) {
        setError("*Can't send more than 5 images");
      } else if (validFiles.length !== files.length) {
        setError("*Some files exceed the 5MB size limit and were not added.");
      } else {
        setError("");
      }
      setFormData({ ...formData, images: validFiles });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("venue", formData.venue);
    formDataToSend.append("price", formData.price);
    Array.from(formData.images).forEach((image, index) => {
      formDataToSend.append(`images`, image);
    });
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_HOST_URL}/events`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("Areeb-token")}`,
          },
        }
      );
      setError("");
      navigate("/");
    } catch (error) {
      if (error.response.data.message === "Unexpected field") {
        setError(
          "*" + "Please fill all the fields and no more than 5 images with 5MB each"
        );
      } else setError("*" + error.response.data.message);
      console.error("Error creating event:", error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-17">
      <h1 className="text-4xl font-bold text-center">Create Event</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 w-2/3 md:w-1/2 mx-auto"
      >
        <p className="text-red-600">{error}</p>
        <input
          type="text"
          className="border border-black p-3 rounded-lg"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Event Name"
          required
        />
        <input
          type="text"
          className="border border-black p-3 rounded-lg"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="text"
          className="border border-black p-3 rounded-lg"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <div>
          <label htmlFor="date">Event Date:</label>
          <input
            type="date"
            className="border border-black p-3 rounded-lg w-full"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="text"
          className="border border-black p-3 rounded-lg"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          placeholder="Venue"
        />
        <input
          type="number"
          className="border border-black p-3 rounded-lg"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <div>
          <p>no more than 5 images with 5MB each</p>
          <input
            type="file"
            className="border border-black p-3 rounded-lg w-full"
            name="images"
            onChange={(e) => setFormData({ ...formData, images: e.target.files })}
            multiple
            accept="image/*"
          />
        </div>
        <div className="text-center">
          <Button
            type="submit"
            loading={loading}
            label="Create Event"
            className="bg-blue-500 text-white font-medium rounded-2xl w-2/3 md:w-1/2 py-4 cursor-pointer "
            disabled={loading}
          ></Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
