
import { useEffect } from "react";
import Landing from "./Landing";

const Index = () => {
  useEffect(() => {
    document.title = "CareerPath - Discover Your Perfect Career";
  }, []);

  return <Landing />;
};

export default Index;
