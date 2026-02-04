import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { FiMail, FiUser, FiHash } from 'react-icons/fi';
import { getInitials } from '../../utils/formatters';

interface ProfileInfoProps {
  profilePhotoUrl?: string;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ profilePhotoUrl }) => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex flex-col items-center mb-6">
        {profilePhotoUrl ? (
          <img
            src={profilePhotoUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-primary-100"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-primary-600 text-white flex items-center justify-center text-4xl font-bold border-4 border-primary-100">
            {getInitials(user.userName)}
          </div>
        )}
        <h2 className="mt-4 text-2xl font-bold text-gray-900">{user.userName}</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
          <FiUser className="text-primary-600 mt-1" size={20} />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500">Username</p>
            <p className="text-base text-gray-900">{user.userName}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
          <FiMail className="text-primary-600 mt-1" size={20} />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-base text-gray-900">{user.email}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
          <FiHash className="text-primary-600 mt-1" size={20} />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500">User ID</p>
            <p className="text-base text-gray-900 font-mono text-sm">{user.userId}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
