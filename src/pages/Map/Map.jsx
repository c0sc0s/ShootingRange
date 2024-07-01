import WujieReact from "wujie-react";

const url = "/screen/";

const Map = () => {
  const cookie = document.cookie;
  return (
    <div
      style={{
        height: "94vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <WujieReact
        name="map"
        url={url}
        width={"100vw"}
        overflow={"hidden"}
        height={"94vh"}
        props={{
          cookie,
        }}
      />
    </div>
  );
};

export default Map;
