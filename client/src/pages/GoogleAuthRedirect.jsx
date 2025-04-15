import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/"); // Redirect to home or dashboard
    }
  }, []);

  return <div>Logging in with Google...</div>;
};

export default GoogleAuthRedirect;
