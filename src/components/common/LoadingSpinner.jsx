import { PageLoader } from "../ui/Spinner";

const LoadingSpinner = ({ label = "Loading" }) => {
  return <PageLoader label={label} />;
};

export default LoadingSpinner;
