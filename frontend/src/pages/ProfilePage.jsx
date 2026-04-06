import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useCustomHooks';
import { useToast } from '../context/ToastContext';
import { Button } from '../components';
import { Input } from '../components';
import { Card } from '../components';
import { Loading } from '../components';
import { transformError } from '../utils/apiErrors';
import { API_BASE_URL } from '../config/config';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { showSuccess, showError } = useToast();

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    phoneNumber: '',
    department: '',
    enrollmentYear: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || user.name?.split(' ')[0] || '',
        lastName: user.lastName || user.name?.split(' ')[1] || '',
        email: user.email || '',
        studentId: user.studentId || '',
        phoneNumber: user.phoneNumber || '',
        department: user.department || '',
        enrollmentYear: user.enrollmentYear || '',
      });
      setPhotoPreview(user.profilePhoto || null);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updateData = new FormData();
      Object.keys(formData).forEach(key => {
        updateData.append(key, formData[key]);
      });

      if (profilePhoto) {
        updateData.append('profilePhoto', profilePhoto);
      }

      const response = await axios.post(
        `${API_BASE_URL}/student/update-profile`,
        updateData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        updateProfile(response.data.data);
        showSuccess('Profile updated successfully');
        setEditing(false);
        setProfilePhoto(null);
      }
    } catch (error) {
      const errorMessage = transformError(error);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      showError('New password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/change-password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }
      );

      if (response.data.success) {
        showSuccess('Password changed successfully');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setChangePassword(false);
      }
    } catch (error) {
      const errorMessage = transformError(error);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <Loading fullpage />;
  }

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1>My Profile</h1>
        <p>View and manage your profile information</p>
      </div>

      <div className="profile-container">
        {/* Profile Photo Section */}
        <div className="profile-photo-section">
          <Card>
            <div className="photo-container">
              {photoPreview ? (
                <img src={photoPreview} alt="Profile" className="profile-photo" />
              ) : (
                <div className="photo-placeholder">
                  <span>📷</span>
                </div>
              )}
            </div>

            {editing && (
              <div className="photo-upload">
                <label htmlFor="photo-input" className="upload-label">
                  Change Photo
                </label>
                <input
                  id="photo-input"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="photo-input"
                />
              </div>
            )}

            <div className="student-info">
              <h2>{user.name || `${formData.firstName} ${formData.lastName}`}</h2>
              <p className="student-id">{user.studentId || formData.studentId}</p>
              <p className="email">{user.email || formData.email}</p>
            </div>
          </Card>
        </div>

        {/* Profile Information Section */}
        <div className="profile-info-section">
          <Card title="Profile Information">
            {!editing ? (
              <div className="info-display">
                <div className="info-row">
                  <label>First Name</label>
                  <span>{formData.firstName}</span>
                </div>
                <div className="info-row">
                  <label>Last Name</label>
                  <span>{formData.lastName}</span>
                </div>
                <div className="info-row">
                  <label>Email</label>
                  <span>{formData.email}</span>
                </div>
                <div className="info-row">
                  <label>Student ID</label>
                  <span>{formData.studentId}</span>
                </div>
                <div className="info-row">
                  <label>Phone Number</label>
                  <span>{formData.phoneNumber || 'Not provided'}</span>
                </div>
                <div className="info-row">
                  <label>Department</label>
                  <span>{formData.department || 'Not provided'}</span>
                </div>
                <div className="info-row">
                  <label>Enrollment Year</label>
                  <span>{formData.enrollmentYear || 'Not provided'}</span>
                </div>

                <Button
                  label="Edit Profile"
                  onClick={() => setEditing(true)}
                  className="edit-btn"
                />
              </div>
            ) : (
              <form onSubmit={handleUpdateProfile} className="profile-form">
                <div className="form-row">
                  <Input
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />

                <Input
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                />

                <Input
                  label="Enrollment Year"
                  type="number"
                  name="enrollmentYear"
                  value={formData.enrollmentYear}
                  onChange={handleInputChange}
                />

                <div className="form-actions">
                  <Button
                    label="Save Changes"
                    type="submit"
                    variant="primary"
                    disabled={loading}
                  />
                  <Button
                    label="Cancel"
                    variant="secondary"
                    onClick={() => {
                      setEditing(false);
                      setProfilePhoto(null);
                      setPhotoPreview(user.profilePhoto || null);
                    }}
                    disabled={loading}
                  />
                </div>
              </form>
            )}
          </Card>
        </div>

        {/* Security Section */}
        <div className="security-section">
          <Card title="Security">
            {!changePassword ? (
              <div className="security-info">
                <p>Keep your account secure by regularly updating your password</p>
                <Button
                  label="Change Password"
                  variant="secondary"
                  onClick={() => setChangePassword(true)}
                />
              </div>
            ) : (
              <form onSubmit={handleChangePassword} className="password-form">
                <Input
                  label="Current Password"
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />

                <Input
                  label="New Password"
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  helper="Minimum 8 characters"
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                />

                <div className="form-actions">
                  <Button
                    label="Update Password"
                    type="submit"
                    variant="primary"
                    disabled={loading}
                  />
                  <Button
                    label="Cancel"
                    variant="secondary"
                    onClick={() => {
                      setChangePassword(false);
                      setPasswordData({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                      });
                    }}
                    disabled={loading}
                  />
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
