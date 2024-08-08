import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getUserProfile, updateUserProfile, deleteUserProfile } from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader'; // Import the Loader component

const ProfilePage = () => {
  const { isAuthenticated, user, signOut } = useAuth();
  const [profile, setProfile] = useState(user || {});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
  });
  const [loading, setLoading] = useState(false); // Loading state
  const [deleting, setDeleting] = useState(false); // Deleting state

  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated) {
        setLoading(true);
        try {
          const token = localStorage.getItem('authToken');
          const profileData = await getUserProfile(token);
          setProfile(profileData);
          setFormData({ name: profileData.name, email: profileData.email });
        } catch (error) {
          console.error('Error fetching profile:', error);
          toast.error('Failed to load profile data.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [isAuthenticated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        const updatedProfile = await updateUserProfile(token, formData);
        setProfile(updatedProfile);
        setIsEditing(false);
        toast.success('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('Error updating profile.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async () => {
    if (isAuthenticated) {
      if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
        setDeleting(true);
        try {
          const token = localStorage.getItem('authToken');
          await deleteUserProfile(token);
          signOut(); // Sign out the user after deletion
          toast.success('Profile deleted successfully!');
        } catch (error) {
          console.error('Error deleting profile:', error);
          toast.error('Error deleting profile.');
        } finally {
          setDeleting(false);
        }
      }
    }
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  if (!isAuthenticated) {
    return <p className='flex flex-col items-center justify-center min-h-96'>Please sign in to view your profile.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} />
      <h2 className="text-2xl font-bold mb-4">Welcome, {profile?.name}!</h2>
      {loading ? (
        <Loader />
      ) : isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-600 text-white rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleEditToggle}
            className="px-4 py-2 bg-red-600 text-white rounded-md ml-2"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {profile?.name}</p>
          <p><strong>Email:</strong> {profile?.email}</p>
          <div className="pt-5">
            <button
              onClick={handleEditToggle}
              className="px-4 py-2 text-white rounded-md"
            >
              Edit Profile
            </button>
            <button
              onClick={signOut}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md ml-2"
            >
              Logout
            </button>
            <button
              onClick={handleDelete}
              className={`px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md ml-2 ${deleting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={deleting}
            >
              Delete Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
