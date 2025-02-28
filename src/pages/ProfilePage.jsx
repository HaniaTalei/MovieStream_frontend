import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './styles/profile.css';

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
          </div>
          <div className="profile-info">
            <h1>{user.name || 'User'}</h1>
            <p>{user.email}</p>
            <p>Account Type: {user.role === 'admin' ? 'Administrator' : 'Standard'}</p>
            <p>Member since: {new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;