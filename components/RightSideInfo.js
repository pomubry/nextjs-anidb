const RightSideInfo = () => {
  let arr = [];

  for (let i = 0; i < 5; i++) {
    arr.push(
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "pink",
          marginBottom: "10px",
        }}
        key={i}
      />
    );
  }
  return <div style={{ width: "100%", marginLeft: "40px" }}>{arr}</div>;
};

export default RightSideInfo;
