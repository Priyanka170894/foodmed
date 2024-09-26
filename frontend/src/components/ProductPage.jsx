import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductPage = () => {
  const [organs, setOrgans] = useState([]);
  const [selectedOrgan, setSelectedOrgan] = useState('all');
  const [diseases, setDiseases] = useState([]);
  const [visibleDiseases, setVisibleDiseases] = useState(8); // To track how many diseases to show
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const organIdFromQuery = queryParams.get('organId'); // Get organId from query params
  
  // Fetch organs for the dropdown on component mount
  useEffect(() => {
    const fetchOrgans = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/organs/filter');
        const data = await response.json();
        setOrgans(data); // Set organs data to state
      } catch (error) {
        console.error('Error fetching organs:', error);
      }
    };

    fetchOrgans();
  }, []);

  // Fetch diseases when the page loads and when an organ is selected
  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        let response;
        if (organIdFromQuery) {
          response = await fetch(`http://localhost:5000/api/diseases/organ/${organIdFromQuery}`);
        } else {
          response = await fetch(`http://localhost:5000/api/diseases/`);
        }
        const data = await response.json();
        setDiseases(data);
      } catch (error) {
        console.error('Error fetching diseases:', error);
      }
    };

    fetchDiseases();

    // If an organ is passed via query params, set it as the selected organ in the dropdown
    if (organIdFromQuery) {
      setSelectedOrgan(organIdFromQuery);
    }
  }, [organIdFromQuery]);

  // Handle dropdown change
  const handleOrganChange = (e) => {
    const selectedOrganId = e.target.value;
    setSelectedOrgan(selectedOrganId);

    // Navigate to the same page with the selected organId as query parameter
    if (selectedOrganId === 'all') {
      navigate(`/products`); // If 'all' is selected, show all diseases
    } else {
      navigate(`/products?organId=${selectedOrganId}`); // Otherwise, show diseases related to the selected organ
    }
  };

  // Handle disease click event to navigate to DiseaseDetailPage
  const handleDiseaseClick = (diseaseId) => {
    navigate(`/diseases?diseaseId=${diseaseId}`);
  };

  // Load more diseases when the "Show More" button is clicked
  const handleShowMore = () => {
    setVisibleDiseases(prev => prev + 8); // Show 8 more diseases
  };

  return (
    <div className="product-page">
      {/* Organ Dropdown */}
      <div className="dropdown">
        <label htmlFor="organSelect" className="description">Select Organ: </label>
        <select className="heading" onChange={handleOrganChange} value={selectedOrgan}>
          <option value="all">All Organs</option>
          {organs.map((organ) => (
            <option key={organ._id} value={organ._id}>
              {organ.name}
            </option>
          ))}
        </select>
      </div>

      <hr />

      {/* Diseases Section */}
      <div className="row">
        {diseases.length > 0 ? (
          diseases.slice(0, visibleDiseases).map((disease) => (
            <div className="col-4" key={disease._id} onClick={() => handleDiseaseClick(disease._id)} style={{ cursor: 'pointer' }}>
              <h3 className="heading">{disease.name}</h3>
              <p className="description">{disease.description}</p>
              <h3 className="motivation">{disease.motivation}</h3>
              <div className="view">
                <button className="btn2" onClick={() => handleDiseaseClick(disease._id)}>View Details</button>
              </div>
            </div>
          ))
        ) : (
          <p>No diseases found.</p>
        )}
      </div>

      {/* Show More Button */}
      {visibleDiseases < diseases.length && (
        <div className="show-more">
          <button className="btn2" onClick={handleShowMore}>Show More</button>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
