import React from "react";
import pic from "../assets/images/subheader.avif";
import TextType from "../components/TextType";

function SubHeader() {
  return (
    <div>
      <header
        style={{
          backgroundImage: `url(${pic})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
        className="py-5"
      >
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">
              <TextType
                text={[
                  "Hoş Geldin Güzellik",
                  "Keyifli Alış Verişler",
                  "İyi Bir Gün Dileriz... !",
                ]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
              />
            </h1>
          </div>
        </div>
      </header>
    </div>
  );
}

export default SubHeader;
