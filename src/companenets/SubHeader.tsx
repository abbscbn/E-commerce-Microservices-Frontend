import pic from "../assets/images/subheader.avif";

function SubHeader() {
  return (
    <div>
      <header
        style={{
          backgroundImage: `url(${pic})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          height: "300px", // istediğin yüksekliği verebilirsin
        }}
        className="py-5"
      >
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Shop in style</h1>
            <p className="lead fw-normal text-white-50 mb-0"></p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default SubHeader;
