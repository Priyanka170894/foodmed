import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles
const basePath = import.meta.env.VITE_BASEPATH ?? "";
const CategorySection = () => {
  const [organs, setOrgans] = useState([]);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024); // Set the initial screen size
  const navigate = useNavigate(); // Initialize useNavigate for programmatic navigation

  // Fetch organs from API
  useEffect(() => {
    const fetchOrgans = async () => {
      try {
        const response = await fetch(`${basePath}/api/organs`);
        const data = await response.json();
        setOrgans(data); // Set organs data to state
      } catch (error) {
        console.error('Error fetching organs:', error);
      }
    };

    fetchOrgans();
  }, []);

  // Update the screen size dynamically
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1024);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle click event to navigate to the product page with organId
  const handleDivClick = (organId) => {
    // Navigate to the product page and set organId as query parameter
    navigate(`/products?organId=${organId}`);
  };

  return (
    <div className="categories">
      <h1 id="categ">Shop by Categories</h1>
      <div className="small-container">
        {isLargeScreen ? (
          // Carousel for large screens
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={1000}
            centerMode={true}
            centerSlidePercentage={100 / 7} // Show 7 cards at once
            emulateTouch={true}
            stopOnHover={true}
            dynamicHeight={false}
          >
            {organs.length > 0 ? (
              organs.map((organ) => (
                <div
                  className="col-3"
                  key={organ._id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDivClick(organ._id)} // Pass organ._id on click
                >
                  <div className="center">{organ.name}</div> {/* Display organ name */}
                  <img src={organ.image} alt={organ.name} />
                </div>
              ))
            ) : (
              <p>Loading categories...</p>
            )}
          </Carousel>
        ) : (
          // Grid layout for small screens
          <div className="row">
            {organs.length > 0 ? (
              organs.map((organ) => (
                <div
                  className="col-3"
                  key={organ._id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDivClick(organ._id)} // Pass organ._id on click
                >
                  <div className="center">{organ.name}</div> {/* Display organ name */}
                  <img src={organ.image} alt={organ.name} />
                </div>
              ))
            ) : (
              <p>Loading categories...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
