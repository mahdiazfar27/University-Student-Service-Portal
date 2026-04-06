import { useState } from 'react';
import { useAuth } from '../hooks/useCustomHooks';
import { useToast } from '../context/ToastContext';
import { Card } from '../components';
import { Button } from '../components';
import { Input } from '../components';
import { transformError } from '../utils/apiErrors';
import { API_BASE_URL } from '../config/config';
import axios from 'axios';
import './SettingsPage.css';

const SettingsPage = () => {
  const { logout } = useAuth();
  const { showSuccess, showError } = useToast();

  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    darkMode: localStorage.getItem('darkMode') === 'true',
    emailNotifications: true,
    smsNotifications: false,
    language: 'en',
  });

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSavePreferences = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/student/update-preferences`,
        preferences
      );

      if (response.data.success) {
        localStorage.setItem('darkMode', preferences.darkMode);
        if (preferences.darkMode) {
          document.body.classList.add('dark-mode');
        } else {
          document.body.classList.remove('dark-mode');
        }
        showSuccess('Preferences updated successfully');
      }
    } catch (error) {
      const errorMessage = transformError(error);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutAllDevices = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/auth/logout-all-devices`
      );

      if (response.data.success) {
        showSuccess('All devices logged out successfully');
        setTimeout(() => logout(), 1000);
      }
    } catch (error) {
      const errorMessage = transformError(error);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/student/delete-account`
      );

      if (response.data.success) {
        showSuccess('Account deleted successfully');
        setTimeout(() => logout(), 1000);
      }
    } catch (error) {
      const errorMessage = transformError(error);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account preferences and settings</p>
      </div>

      <div className="settings-container">
        {/* Display Preferences */}
        <Card
          title="Display Preferences"
          className="settings-card"
        >
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-label">
                <label>Dark Mode</label>
                <p>Enable dark theme for the application</p>
              </div>
              <div className="setting-control">
                <input
                  type="checkbox"
                  checked={preferences.darkMode}
                  onChange={(e) => handlePreferenceChange('darkMode', e.target.checked)}
                  className="toggle-checkbox"
                  id="dark-mode-toggle"
                />
                <label htmlFor="dark-mode-toggle" className="toggle-label"></label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-label">
                <label>Language</label>
                <p>Choose your preferred language</p>
              </div>
              <div className="setting-control">
                <select
                  value={preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  className="language-select"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
            </div>

            <div className="button-group">
              <Button
                label="Save Preferences"
                variant="primary"
                onClick={handleSavePreferences}
                disabled={loading}
              />
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card
          title="Notification Settings"
          className="settings-card"
        >
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-label">
                <label>Email Notifications</label>
                <p>Receive updates and alerts via email</p>
              </div>
              <div className="setting-control">
                <input
                  type="checkbox"
                  checked={preferences.emailNotifications}
                  onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                  className="toggle-checkbox"
                  id="email-notif-toggle"
                />
                <label htmlFor="email-notif-toggle" className="toggle-label"></label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-label">
                <label>SMS Notifications</label>
                <p>Receive text message alerts (if available)</p>
              </div>
              <div className="setting-control">
                <input
                  type="checkbox"
                  checked={preferences.smsNotifications}
                  onChange={(e) => handlePreferenceChange('smsNotifications', e.target.checked)}
                  className="toggle-checkbox"
                  id="sms-notif-toggle"
                />
                <label htmlFor="sms-notif-toggle" className="toggle-label"></label>
              </div>
            </div>

            <div className="info-box">
              <p>Notification preferences will be saved when you update your preferences above.</p>
            </div>
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card
          title="Privacy Settings"
          className="settings-card"
        >
          <div className="settings-group">
            <div className="privacy-item">
              <h4>Data Privacy</h4>
              <p>Your academic records and personal information are protected by strict privacy policies.</p>
              <Button
                label="View Privacy Policy"
                variant="outline"
                onClick={() => window.open('/privacy', '_blank')}
              />
            </div>

            <div className="privacy-item">
              <h4>Third-party Access</h4>
              <p>Control which applications and services have access to your data.</p>
              <Button
                label="Manage Connected Apps"
                variant="outline"
                onClick={() => alert('Feature coming soon')}
              />
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card
          title="Security Settings"
          className="settings-card danger"
        >
          <div className="settings-group">
            <div className="security-item">
              <div className="security-info">
                <h4>Active Sessions</h4>
                <p>You are currently logged in on this device. Logging out from all devices will end all active sessions.</p>
              </div>
              <Button
                label="Logout All Devices"
                variant="danger"
                onClick={handleLogoutAllDevices}
                disabled={loading}
              />
            </div>

            <div className="security-item">
              <div className="security-info">
                <h4>Delete Account</h4>
                <p className="warning-text">This action is permanent and cannot be undone. All your data will be deleted.</p>
              </div>
              <Button
                label="Delete Account"
                variant="danger"
                onClick={handleDeleteAccount}
                disabled={loading}
              />
            </div>
          </div>
        </Card>

        {/* About Section */}
        <Card
          title="About"
          className="settings-card"
        >
          <div className="about-section">
            <div className="about-item">
              <label>Application Version</label>
              <span>1.0.0</span>
            </div>
            <div className="about-item">
              <label>Last Updated</label>
              <span>January 2024</span>
            </div>
            <div className="about-item">
              <label>Support</label>
              <span>
                <a href="mailto:support@university.edu">support@university.edu</a>
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
