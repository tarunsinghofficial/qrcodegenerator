"use client";
import Link from "next/link";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import * as htmlToImage from "html-to-image";
import { HexColorPicker } from "react-colorful";
import withAuth from "../api/withAuth";

function Page() {
  const [inputVal, setInputVal] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [qrColor, setQrColor] = useState("#000000");

  const handleInput = (e) => {
    setInputVal(e.target.value);
    setShowQR(false);
  };

  const handleCreateQr = () => {
    if (inputVal.trim() !== "") {
      setShowQR(true);
    } else {
      setShowQR(false);
      alert("Enter some text or url to create a QR!");
    }
  };

  const handleQrDownload = () => {
    const svgElement = document.getElementById("qrcode-svg");

    if (svgElement) {
      htmlToImage
        .toPng(svgElement)
        .then(function (dataUrl) {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "qr-code.png";
          link.click();
        })
        .catch(function (error) {
          console.error("Error generating QR code:", error);
        });
    }
  };

  const handleShareQr = () => {
    const svgElement = document.getElementById("qrcode-svg");

    if (svgElement) {
      htmlToImage
        .toPng(svgElement)
        .then((dataUrl) => {
          fetch(dataUrl)
            .then((res) => res.blob())
            .then((blob) => {
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = "qr-code.png";
              link.click();
              alert(
                "QR code image has been downloaded. You can now share it on WhatsApp."
              );
            })
            .catch((error) => {
              console.error("Error generating QR code:", error);
            });
        })
        .catch((error) => {
          console.error("Error generating QR code:", error);
        });
    }
  };

  return (
    <div className="bg-white h-screen flex items-center justify-around container mx-auto">
      <div className="flex flex-col md:flex-row lg:flex-row justify-between items-center gap-10 p-10">
        <div className="flex items-center">
          <div className="flex flex-col space-y-10 p-4">
            <h2 className="text-xl md:text-2xl lg:text-4xl font-extrabold max-w-2xl">
              Enter the text or URL to create a QR CODE
            </h2>
            <p className="text-gray-400 text-md md:text-lg lg:text-xl">
              Your QR Code will be generated automatically
            </p>
            <div className="flex flex-col gap-4 items-center md:flex-row lg:flex-row space-x-4">
              <input
                value={inputVal}
                onChange={handleInput}
                required
                className="border border-[#4361ee] focus:border focus:border-[#4361ee] p-2 rounded-md w-full"
                placeholder="Enter something"
              />
              <button
                onClick={handleCreateQr}
                className="bg-[#4361ee] w-44 flex justify-center text-white rounded-md p-2 font-bold"
              >
                Create now
              </button>
            </div>
          </div>
        </div>
        {showQR && (
          <div className="flex flex-col gap-5 items-center">
            <div className="border-4 border-[#fb6f92] p-2 rounded-md hover:scale-105 hover:cursor-pointer duration-200 transition-all">
              <QRCodeSVG
                id="qrcode-svg"
                value={inputVal}
                fgColor={qrColor}
                className="flex justify-center w-[200px] h-[200px] md:w-[15em] md:h-[15em] lg:w-[25em] lg:h-[25em]"
              />
            </div>
            <button
              onClick={handleQrDownload}
              className="bg-[#ffd60a] w-44 flex justify-center text-black rounded-md p-2 font-bold"
            >
              Download
            </button>
            <button
              onClick={handleShareQr}
              className="bg-[#4caf50] w-44 flex justify-center text-white rounded-md p-2 font-bold"
            >
              Share
            </button>
            <HexColorPicker color={qrColor} onChange={setQrColor} />
          </div>
        )}
      </div>
    </div>
  );
}

export default withAuth(Page);