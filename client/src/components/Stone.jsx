const stoneDiameter = "85%";

const Stone = ({ color }) => {
  return (
    <div
      style={{
        display: "flex",
        width: stoneDiameter,
        height: stoneDiameter,
        backgroundColor: color,
        borderRadius: "50%",
      }}
    ></div>
  );
};

export default Stone;
