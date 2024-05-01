import React, { useState } from 'react';
import BWIPJS from 'bwip-js';

const App = () => {
  const [barcodeData, setBarcodeData] = useState('');

  const generateBarcode = () => {
    const randomBarcode = Math.random().toString().slice(2,12); // Generate random 10 digit number
    setBarcodeData(randomBarcode);

    BWIPJS.toBuffer({
      bcid: 'code128',       // Barcode type
      text: randomBarcode,   // Text to encode
      scale: 3,              // 3x scaling factor
      height: 10,            // Bar height, in millimeters
      includetext: true,     // Show human-readable text
      textxalign: 'center',  // Always good to set this
    }, function (err, png) {
      if (err) {
        // Decide how to handle the error
        // 'err' may be a string or Error object
      } else {
        let imgSrc = `data:image/png;base64,${png.toString('base64')}`;
        document.getElementById('barcode').src = imgSrc;
      }
    });
  };

  const printBarcode = () => {
    window.print();
  };

  return (
    <div className="App">
      <button onClick={generateBarcode}>Generate Barcode</button>
      <button onClick={printBarcode}>Print Barcode</button>
      <img id="barcode" alt="barcode" />
    </div>
  );
}

export default App;