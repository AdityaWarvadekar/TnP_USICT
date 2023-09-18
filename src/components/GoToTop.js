import { useEffect } from "react";
import { useLocation } from "react-router-dom";
  
export default function GoToTop() {
  const routePath = useLocation();
  const onTop = () => {
    window.scrollTo(0, 0);
  }
  useEffect(() => {
    onTop()
  }, [routePath]);  //whenever route path changes, this function run
  
  return null;
}