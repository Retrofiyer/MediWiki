import { CSSProperties } from "react";
import { RingLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};

const Loader = () => {
  return (
    <div className="sweet-loading">
      <RingLoader
        color={"#125e8a"}
        loading={true}
        cssOverride={override}
        size={150}
      />
    </div>
  );
};

export default Loader;