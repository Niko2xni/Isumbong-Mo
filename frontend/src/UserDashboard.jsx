import "./App.css";
import ideaImage from "./assets/image 2.png";
import history from "./assets/history.png";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const handleFileReport = () => {
    navigate("/file-report");
  };

  const handleComplaintsHistory = () => {
    navigate("/check-complaints");
  };

  return (
    <main className="main-content">

      <p className="intro-text">
        How are you feeling? See anything odd? File now to process your
        concern!
      </p>

      <div className="complaint-card">
        <div className="complaint-text">
          <h2>File a Complaint</h2>
          <p>
            Don’t stop now, keep an eye out for your surroundings. Make the
            call and the action to make the change happen! Every thought
            counts, make your concern be known by just a click of a button.
          </p>
          <button onClick={handleFileReport} className="report-btn">FILE REPORT</button>
        </div>
        <img src={ideaImage} alt="Idea Illustration" className="complaint-img" />
      </div>

      <h3 className="section-title">Recent Complaints</h3>
      <div className="complaints-grid">
        <div className="complaint-box" />
        <div className="complaint-box" />
        <div className="complaint-box" />
      </div>

      <div className="complaint-card">
        <div className="complaint-text">
          <h2>Check Complaints</h2>
          <p>
            Want to keep track of every complaint you've issued?
            Analyze how many reports returned resolved or pending?
            Check by pressing the button below to view!
          </p>
          <button onClick={handleComplaintsHistory} className="check-btn">CHECK COMPLAINTS</button>
        </div>
        <img src={history} alt="Idea Illustration" className="history-img" />
      </div>
    </main>
  );
};

export default Home;
