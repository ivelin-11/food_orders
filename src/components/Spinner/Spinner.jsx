import "./spinner.css";

export default function Spinner({ styleProp, ...props }) {
  return (
    <>
      <div className="loader" style={styleProp} {...props}></div>
    </>
  );
}
