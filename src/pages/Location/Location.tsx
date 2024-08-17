import LocationSensitive from "@/components/ui/LocationSensitive";
import { useLocation } from "react-router-dom";

const Location = ({}) => {
  const location = useLocation();
  const { cca2 } = location.state;
  console.log(cca2);
  return (
    <div>
      <LocationSensitive cca2={cca2} />
    </div>
  );
};
export default Location;
