import { SpinnerRoundOutlined } from "spinners-react";

export const Loader = () => {
  const style = {
    display: "block",
    margin: "0 auto",
  };
  return <SpinnerRoundOutlined style={style} color={"#3f51b5"} size={40} />;
};
