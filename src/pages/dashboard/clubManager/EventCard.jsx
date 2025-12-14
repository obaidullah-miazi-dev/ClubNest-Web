import React from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Ticket,
  User,
  Pencil,
  Trash,
  Info,
} from "lucide-react";
import useRole from "../../../hooks/useRole";
import { NavLink, useLocation } from "react-router";

const EventCard = ({ event }) => {
  const { role } = useRole();
  const Location = useLocation();
  const {
    eventName,
    description,
    category,
    location,
    eventImage,
    eventDate,
    clubEmail,
    _id
  } = event;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      {/* Event Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={eventImage}
          alt={eventName}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="px-4 py-2 bg-main/90 text-white rounded-full text-sm font-bold backdrop-blur-sm">
            {category}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{eventName}</h3>

        <p className="text-gray-600 line-clamp-2 mb-5">{description}</p>

        {/* Event Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gray-700">
            <Calendar className="w-5 h-5 text-main" />
            <span className="font-medium">{formatDate(eventDate)}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <Clock className="w-5 h-5 text-main" />
            <span>{formatTime(eventDate)}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <MapPin className="w-5 h-5 text-main" />
            <span>{location}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <User className="w-5 h-5 text-main" />
            <span>{clubEmail}</span>
          </div>
        </div>

        {/* Action Buttons */}
        {role !== "Club-Manager" ? (
          <>
            <div className="mt-5 pt-5 flex-1">
              <NavLink className={`w-full`}>
                <button className="bg-green-500 text-white font-semibold py-2 w-full rounded-xl flex justify-center items-center gap-2 cursor-pointer">
                  {" "}
                  <Info size={18} /> Details
                </button>
              </NavLink>
            </div>
          </>
        ) : (
          <>
            <div className="mt-6 pt-6 border-t border-gray-100">
              {/* edit delete button display only for club manager */}
              {Location.pathname === "/" && role === "Club-Manager" ? (
                <NavLink className={`w-full`}>
                  <button className="bg-green-500 text-white font-semibold py-2 mt-5 w-full rounded-xl flex justify-center items-center gap-2 cursor-pointer">
                    {" "}
                    <Info size={18} /> Details
                  </button>
                </NavLink>
              ) : (
                role === "Club-Manager" && (
                  <>
                    <div className="flex justify-between items-center gap-2">
                      <button
                        //   onClick={() => handleEdit(_id)}
                        className="bg-green-600 text-white font-semibold py-2 w-full rounded-xl flex justify-center items-center gap-2 cursor-pointer"
                      >
                        {" "}
                        <Pencil size={18} /> Edit
                      </button>
                      <button
                        //   onClick={() => handleDelete(_id)}
                        className="bg-red-600 text-white font-semibold py-2 w-full rounded-xl flex justify-center items-center gap-2 cursor-pointer"
                      >
                        {" "}
                        <Trash size={18} /> Delete
                      </button>

                      <NavLink to={`/eventDetails/${_id}`} className={`w-full`}>
                        <button className="bg-main text-white font-semibold py-2 w-full rounded-xl flex justify-center items-center gap-2 cursor-pointer">
                          {" "}
                          <Info size={18} /> Details
                        </button>
                      </NavLink>
                    </div>
                  </>
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventCard;
