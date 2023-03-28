import "./NewsLetter.scss";

const NewsLetter = () => {
  return (
    <div className="newsContainer">
      <h2>Newsletter</h2>
      <p>Get timely updates from your favorite products.</p>
      <div className="inputContainer">
        <input type="email" placeholder="Enter Your Email" />
        <button>SEND</button>
      </div>
    </div>
  );
};

export default NewsLetter;
