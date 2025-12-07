// components/ClubCard.jsx
import React from 'react';
import { MapPin, Users, Calendar, Clock, CheckCircle2, XCircle } from 'lucide-react';

const ClubCard = ({ club }) => {
  const {
    clubName,
    description,
    category,
    location,
    memberShipFee,
    clubImage,
    managerName,
    status,
    createdAt
  } = club;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const statusConfig = {
    approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
    pending: { color: 'bg-amber-100 text-amber-800', icon: Clock },
    rejected: { color: 'bg-red-100 text-red-800', icon: XCircle }
  };

  const StatusIcon = statusConfig[status]?.icon || Clock;

  return (
    <div className="bg-white rounded-3xl shadow-lg shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      {/* Club Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={clubImage}
          alt={clubName}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${statusConfig[status]?.color || 'bg-gray-100 text-gray-800'}`}>
            <StatusIcon className="w-4 h-4" />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{clubName}</h3>
        
        <p className="text-gray-600 line-clamp-2 mb-4">
          {description}
        </p>

        {/* Meta Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-700">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
            {category}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-5 h-5" />
          <span>{location}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="w-5 h-5" />
            <span className="text-sm">{formatDate(createdAt)}</span>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold text-main">
              ৳{memberShipFee.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">membership fee</p>
          </div>
        </div>

        {/* Manager */}
        <div className="mt-5 pt-5 border-t border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Managed by</p>
            <p className="font-semibold text-gray-800">{managerName}</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ClubCard;