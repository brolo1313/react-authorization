import { useLoader } from "./loaderContext";
import "./loader.css";

export const Loader = () => {
  const { isLoading, loaderText } = useLoader();
  return (
    <>
      {isLoading ? (
        <div className="overlay">
          <div className="wrapper">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <span>{loaderText}</span>
          </div>
        </div>
      ) : null}
    </>
  );
};
