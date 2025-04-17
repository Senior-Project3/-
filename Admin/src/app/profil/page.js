'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, AlertTriangle, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Swal from 'sweetalert2';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    fullname: '',
    username: '',
    email: '',
    role: '',
    profileImage: '/default-profile.jpg',
  });
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Fallback to localStorage if cookie not accessible
        const response = await axios.get('http://localhost:4000/api/users/get', )
        //     {
        //   headers: { Authorization: `Bearer ${token}` },
        //   withCredentials: true,
        // }
    
        setProfile(response.data);
        setFormData({
          fullname: response.data.fullname,
          username: response.data.username || '',
          email: response.data.email,
          password: '',
        });
      } catch (err) {
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:4000/api/users/get', formData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('profileImage', imageFile);
        const imageResponse = await axios.post('http://localhost:4000/api/users/profile/image', imageFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });
        setProfile({ ...profile, profileImage: imageResponse.data.profileImage });
      }
      setProfile({
        ...profile,
        fullname: formData.fullname,
        username: formData.username,
        email: formData.email,
      });
      Swal.fire({
        title: 'Success!',
        text: 'Profile updated successfully',
        icon: 'success',
        confirmButtonColor: '#10b981',
      });
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: err.response?.data?.error || 'Failed to update profile',
        icon: 'error',
        confirmButtonColor: '#10b981',
      });
    }
  };

  const handleDeleteProfile = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete your profile. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete('http://localhost:4000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        localStorage.removeItem('token');
        window.location.href = '/login';
        Swal.fire({
          title: 'Deleted!',
          text: 'Your profile has been deleted',
          icon: 'success',
          confirmButtonColor: '#10b981',
        });
      } catch (err) {
        Swal.fire({
          title: 'Error!',
          text: err.response?.data?.error || 'Failed to delete profile',
          icon: 'error',
          confirmButtonColor: '#10b981',
        });
      }
    }
  };

  if (loading) return <div className="text-center p-6 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center p-6 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 p-6">
      <Card className="max-w-2xl mx-auto bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">Admin Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <img
              src={profile.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{profile.fullname}</h2>
              <p className="text-gray-600">{profile.email}</p>
              <p className="text-gray-600">Username: {profile.username || 'N/A'}</p>
              <p className="text-gray-600">Role: {profile.role}</p>
            </div>
          </div>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">New Password (leave blank to keep current)</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <Label htmlFor="profileImage">Profile Image</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  id="profileImage"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleImageChange}
                  className="flex-1"
                />
                <Upload className="h-5 w-5 text-teal-600" />
              </div>
            </div>
            <div className="flex space-x-4">
              <Button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                Update Profile
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDeleteProfile}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;