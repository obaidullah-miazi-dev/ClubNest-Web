import React, { useContext } from "react";
import { Calendar, Mail, User, Shield } from "lucide-react";
import { AuthContext } from "../provider/authProvider";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(parseInt(timestamp)).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-3xl shadow-xl">
          <div className="flex flex-col sm:flex-row items-center  sm:items-center  gap-6 px-5 py-10">
            <div>
              <img
                src={user.photoURL || "https://via.placeholder.com/150"}
                alt={user.displayName}
                className="w-40 h-40 rounded-full border-8 border-white shadow-2xl object-cover"
              />
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-4xl font-bold text-gray-900">
                {user.displayName || "User"}
              </h1>
              <p className="text-xl text-gray-600 mt-1">{user.email}</p>
              <div
                className={`inline-flex items-center gap-2 mt-3 ${
                  user.emailVerified ? "text-green-600" : "text-red-500"
                }`}
              >
                <Shield className="w-5 h-5" />
                <span className="font-medium">
                  {user.emailVerified ? "Email Verified" : "Email Not Verified"}
                </span>
              </div>
            </div>

            <div className="sm:ml-auto">
              {/* <Button className="rounded-full px-8 py-3 text-lg shadow-lg">
                  Edit Profile
                </Button> */}
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {/* Account Info */}
          <div className="bg-white rounded-2xl p-8 shadow-lg flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <User className="w-7 h-7 text-main" />
              Account Information
            </h2>

            <div className="space-y-5">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-lg font-semibold">
                  {user.displayName || "Not set"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email Address
                </p>
                <p className="text-lg font-semibold">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Member Since
                </p>
                <p className="text-lg font-semibold">
                  {formatDate(user.metadata?.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Activity Stats */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Your Activity
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-purple-50 rounded-2xl">
                <div className="text-4xl font-bold text-main">12</div>
                <p className="text-gray-600 mt-2">Clubs Joined</p>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-2xl">
                <div className="text-4xl font-bold text-blue-600">28</div>
                <p className="text-gray-600 mt-2">Events Attended</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-2xl">
                <div className="text-4xl font-bold text-green-600">5</div>
                <p className="text-gray-600 mt-2">Clubs Created</p>
              </div>
              <div className="text-center p-6 bg-orange-50 rounded-2xl">
                <div className="text-4xl font-bold text-orange-600">43</div>
                <p className="text-gray-600 mt-2">Posts Made</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
