import React, { useContext } from "react";
import { MapPin, Calendar, DollarSign, Users, Tag, Mail } from "lucide-react";
import useRole from "../hooks/useRole";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../provider/authProvider";

const ClubDetails = () => {
  const { id } = useParams();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${id}`);
      return res.data;
    },
  });

  const { data: membershipData } = useQuery({
    queryKey: ["membershipData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/membershipGet");
      return res.data;
    },
  });

  const club = data?.[0];
  // console.log(club?._id)
  // console.log(membershipData)
  const existMembershipData = membershipData?.find(
    (data) => data.clubId == club?._id && data.memberEmail === user.email
  );
  // console.log(existMembershipData);

  const { mutate: joinReq } = useMutation({
    mutationFn: async (membershipInfo) => {
      const res = await axiosSecure.post("/addMembership", membershipInfo);
      return res.data;
    },
    onSuccess: () => {
      alert("Your join request has been added.");
      navigate("/dashboard/my-join-requests");
    },
  });

  const handleJoinRequest = () => {
    const membershipData = {
      clubId: club._id,
      clubName: club.clubName,
      clubImage: club.clubImage,
      clubFee: club.memberShipFee,
      memberEmail: user.email,
      memberName: user.displayName,
      memberImage: user.photoURL,
    };
    joinReq(membershipData);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen w-11/12 mx-auto">
      {/* Hero Section with Banner */}
      <div className="relative h-96 md:h-[500px] overflow-hidden mt-8 rounded-4xl">
        <img
          src={club?.clubImage}
          alt={club?.clubName}
          className="w-full h-full object-cover rounded-4xl"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

        {/* Club Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-2xl">
            {club?.clubName}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              <span>{club?.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6" />
              <span>{club?.membersCount || "0"} Members</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              <span>{club?.eventsCount || "0"} Events</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/*  Description */}
          <div className="lg:col-span-2 space-y-10">
            {/* About Section */}
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About This Club
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {club?.description}
              </p>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-linear-to-br from-main/10 to-purple-100 rounded-2xl p-6 text-center">
                <Tag className="w-12 h-12 text-main mx-auto mb-3" />
                <p className="text-gray-600">Category</p>
                <p className="text-2xl font-bold text-main">{club?.category}</p>
              </div>
              <div className="bg-linear-to-br from-green-50 to-emerald-100 rounded-2xl p-6 text-center">
                <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <p className="text-gray-600">Membership Fee</p>
                <p className="text-3xl font-bold text-green-700">
                  ৳{club?.memberShipFee}
                </p>
              </div>
              <div className="bg-linear-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 text-center">
                <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <p className="text-gray-600">Established</p>
                <p className="text-xl font-bold text-blue-700">
                  {formatDate(club?.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Manager info Card */}
          <div className="space-y-8">
            {/* Manager Info */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Club Manager
              </h3>
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-gray-600" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">
                    {club?.managerName}
                  </p>
                  <p className="text-gray-500">Club Leader</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="w-5 h-5" />
                  <span className="text-lg">{club?.managerEmail}</span>
                </div>
              </div>
            </div>

            {role === "member" && (
              <>
                {/* Join Button */}
                <div className="bg-linear-to-r from-main to-purple-700 rounded-3xl p-8 text-center text-white shadow-2xl">
                  <h3 className="text-2xl font-bold mb-4">Ready to Join?</h3>
                  <p className="text-lg mb-8 opacity-90">
                    Become a member and get access to exclusive events and
                    community!
                  </p>
                  {existMembershipData ? (
                    <button className="w-full bg-white text-main font-bold text-xl py-5 rounded-2xl cursor-not-allowed shadow-lg">
                      Already Joined
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleJoinRequest}
                        className="w-full bg-white text-main font-bold text-xl py-5 rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
                      >
                        Join Club — $ {club?.memberShipFee}
                      </button>
                    </>
                  )}
                  {club?.memberShipFee === 0 && (
                    <p className="mt-4 text-lg font-medium">
                      Free Membership Available!
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
