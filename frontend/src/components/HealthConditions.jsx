import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
const basePath = import.meta.env.VITE_BASEPATH ?? "";

const HealthConditionSection = () => {
  const [diseases, setDiseases] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Hardcoded organId
  const organId = '66e54093438e7938dd9d223d'; // The organ ID you provided

  // Fetch diseases related to the organ using Fetch
  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await fetch(`${basePath}/api/diseases/organ/${organId}`);
        const data = await response.json();
        setDiseases(data); // Set diseases data to state
      } catch (error) {
        console.error('Error fetching diseases:', error);
      }
    };

    fetchDiseases();
  }, []); // Empty dependency array to run once on component mount

  // Handle card click event
  const handleCardClick = (diseaseId) => {
    navigate(`/diseases?diseaseId=${diseaseId}`);
  };
  

  return (
    <div className="conditions">
      <h1>Top Health Concerns: Knowledge for a Healthier Life</h1>
      <div className="row">
        {diseases.length > 0 ? (
          diseases.map((disease) => (
            <div 
              className="col-4" 
              key={disease._id} 
              onClick={() => handleCardClick(disease._id)} // Handle card click
              style={{ cursor: 'pointer' }} // Add cursor to indicate clickable card
            >
              <h2 className="heading">{disease.name}</h2>
              <h4 className="description">{disease.description}</h4>
              <h3 className="motivation">{disease.motivation}</h3>
              <div className="view">
              <button className="btn2" onClick={handleCardClick}>View Details</button>
              </div>
            </div>
          ))
        ) : (
          <p>Loading health conditions...</p>
        )}
      </div>
    </div>
  );
};

export default HealthConditionSection;
