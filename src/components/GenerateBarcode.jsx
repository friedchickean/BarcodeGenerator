import React, { useState, useRef } from 'react';
import Barcode from 'react-barcode';
import { FaPrint } from "react-icons/fa";
import ReactToPrint from 'react-to-print';
import jsPDF from 'jspdf';
import JsBarcode from 'jsbarcode';

const GenerateBarcode = () => {
    const [barcode, setBarcode] = useState('')
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const componentRef = useRef();  // Create a reference
    const [numOfBarcodes, setNumOfBarcodes] = useState(30); // Number of barcodes to generate

    const createBarcode = () => {
        let trackingNumber = 'BH';
        for (let i = 0; i < 13; i++) {
            trackingNumber += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setBarcode(trackingNumber);
    }

    const getTrackingNumber = () => {
        let trackingNumber = 'BH';
        for (let i = 0; i < 13; i++) {
            trackingNumber += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return trackingNumber;
    }

    const generateAvery5160 = (type) => {
        // Create a new instance of jsPDF
        const doc = new jsPDF({
            orientation: 'portrait', // Landscape orientation for Avery 5160 template
            unit: 'in', // Use inches as units
            format: [8.5, 11], // Standard letter size
        });

        // Initial x and y positions for the first barcode
        let x = 0.20; // Initial x position
        let y = 0.5; // Initial y position

        // Loop to generate barcodes
        for (let i = 0; i < numOfBarcodes; i++) {
            // Generate random barcode data
            const barcodeData = getTrackingNumber();

            // Generate barcode image
            const barcodeCanvas = document.createElement('canvas');
            JsBarcode(barcodeCanvas, barcodeData, { format: 'CODE128', width: 2, height: 40 });

            // Convert the canvas to a data URL
            const imageData = barcodeCanvas.toDataURL();

            // Add the barcode image to the PDF
            doc.addImage(imageData, 'JPEG', x, y, 2.625, 1); // Adjusted dimensions to match label size

            // Move to the next position
            if ((i + 1) % 3 === 0) {
                // Move to the next row
                x = 0.20; // Reset x position
                y += 1; // Move to the next row
            } else {
                x += (2.625 + 0.12);
            }
        }
        if (type === 'print') {
            doc.autoPrint();
            window.open(doc.output('bloburl'), '_blank');
        } else {
            doc.save(`${numOfBarcodes} Barcodes.pdf`);
        }
    };

    return (
        <div className='flex flex-col h-screen bg-gray-300'>
            <div className='w-full text-center'>
                <h2 className='border-b-2 border-gray-600 text-4xl py-4 bg-indigo-700 font-semibold text-white'>Barcode Generator</h2>
            </div>
            <div className="flex flex-col md:flex-row h-full">
                <div className='flex flex-col md:w-1/2 p-5'>
                    <div className='shadow-md rounded-md flex flex-col p-5 bg-white h-full justify-center items-center'>
                        <h1 className='font-medium text-xl py-5'>Avery 5160 Barcode Generator</h1>
                        <div className="flex gap-2 items-center ">
                            <label className='font-medium text-xl'>Number of Barcodes</label>
                            <input type="number" value={numOfBarcodes} onChange={(e) => setNumOfBarcodes(e.target.value)} max={30} className='p-2 border-2 rounded-md border-gray-400 text-lg tracking-wide min-h-12 w-1/2' />
                        </div>
                        <button className='bg-indigo-700 w-1/2 text-white p-2 transition-all hover:bg-indigo-800 rounded-md text-lg mt-5' onClick={() => generateAvery5160('print')}>Print Avery 5160</button>
                        <button className='bg-white w-1/2 border-2 p-2 transition-all hover:bg-gray-300 hover:border-gray-400 rounded-md text-lg mt-5' onClick={() => generateAvery5160()}>Download Avery 5160</button>
                    </div>

                </div>
                <div className="flex flex-col md:w-1/2">
                    <div className='flex flex-col p-5 gap-5 w-full flex-grow'>
                        <div className='shadow-md rounded-md flex flex-col md:flex-row p-5 bg-white justify-between gap-2 md:gap-10 items-center'>
                            <div className="flex flex-col w-full md:w-3/5 gap-2">
                                <h1 className='font-medium text-xl'>Barcode</h1>
                                <span className='p-2 border-2 rounded-md border-gray-400 text-lg tracking-wide min-h-12'>{barcode}</span>
                            </div>
                            <div className="flex flex-col w-full md:w-2/5 gap-2">
                                <h1 className='font-medium text-xl'>Actions</h1>
                                <div className="flex gap-5 items-center justify-center">
                                    <button className='bg-indigo-700 w-1/2 text-white p-2 transition-all hover:bg-indigo-800 rounded-md text-lg' onClick={() => createBarcode()}>Generate Barcode</button>
                                    <button className='bg-white-700 border-2 w-1/2 p-2 rounded-md text-lg transition-all hover:bg-gray-100' onClick={() => setBarcode('')}>Clear Barcode</button>
                                </div>
                            </div>
                        </div>
                        <div className='shadow-md rounded-md w-full h-full flex flex-col p-5 bg-white justify-center items-center'>
                            <div ref={componentRef} className={`${barcode ? 'border-2' : ''} rounded-md p-5 min-w-80 min-h-58 justify-center items-center flex`}>
                                {barcode ? (<>
                                    <div className="block sm:hidden">
                                        <Barcode value={barcode} width={'1.5'} />
                                    </div>
                                    <div className="hidden sm:block">
                                        <Barcode value={barcode} />
                                    </div>
                                </>) : <span>No barcode</span>}
                            </div>
                            <ReactToPrint
                                trigger={() => <button className='border-indigo-700 transition-all hover:bg-indigo-700 hover:text-white border-2 p-2 rounded-md w mt-5 flex items-center gap-2'>Print Barcode <FaPrint /></button>}
                                content={() => componentRef.current}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GenerateBarcode