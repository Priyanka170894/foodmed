
import Header from './Header';
import AboutSection from './AboutSection';
import CategorySection from './Categories';
import HealthConditionSection from './HealthConditions';
import StickyMessage from './StickyMessage';


const HomePage = () => {
  return (
    <div>
      
      
      <StickyMessage />
      <Header />
      <AboutSection />
      <CategorySection />
      <HealthConditionSection />
      
    </div>
  );
};

export default HomePage;
