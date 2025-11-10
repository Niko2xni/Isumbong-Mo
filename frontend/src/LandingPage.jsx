import { useNavigate } from "react-router-dom";

const LandingPage = () => {

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="app">
      <div className="page">
        <div className="content">
          <header className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">Isumbong Mo</h1>
              <p className="hero-description">
                "Isumbong mo" is a digital platform centralizing barangay
                dispute processes. Local residents may file complaints and
                track the progress of their reports efficiently.
              </p>
              <div className="hero-actions">
                <button onClick={handleRegister} className="btn btn-register">
                  Register
                </button>
                <button onClick={handleLogin} className="btn btn-login">Log In</button>
              </div>
            </div>
          </header>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
