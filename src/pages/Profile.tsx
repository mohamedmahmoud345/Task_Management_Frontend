import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout/Layout';
import { ProfileInfo } from '../components/Profile/ProfileInfo';
import { PhotoUpload } from '../components/Profile/PhotoUpload';
import { userService } from '../services/userService';

const Profile: React.FC = () => {
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfilePhoto();
  }, []);

  const fetchProfilePhoto = async () => {
    try {
      const url = await userService.getProfilePhoto();
      setProfilePhotoUrl(url);
    } catch {
      // It's okay if there's no profile photo yet
      console.log('No profile photo found');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = (url: string) => {
    setProfilePhotoUrl(url);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Profile</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProfileInfo profilePhotoUrl={profilePhotoUrl} />
          <PhotoUpload onUploadSuccess={handleUploadSuccess} />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
