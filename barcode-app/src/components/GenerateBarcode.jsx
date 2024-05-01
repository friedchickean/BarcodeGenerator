import React, { useState, useRef } from 'react';
import Barcode from 'react-barcode';
import { FaPrint } from "react-icons/fa";
import ReactToPrint from 'react-to-print';

const GenerateBarcode = () => {
    const [barcode, setBarcode] = useState('')
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const componentRef = useRef();  // Create a reference

    const createBarcode = () => {
        let trackingNumber = 'BH';
        for (let i = 0; i < 13; i++) {
            trackingNumber += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setBarcode(trackingNumber);
    }

    return (
        <div className='flex flex-col h-screen bg-gray-300'>
            <div className='w-full text-center'>
                <h2 className='border-b-2 border-gray-600 text-4xl py-4 bg-indigo-700 font-semibold text-white'>Barcode Generator</h2>
            </div>
            <div className='flex flex-col p-5 gap-5 w-full flex-grow'>

                <div className='shadow-md rounded-md flex flex-col md:flex-row p-5 bg-white justify-between items gap-10 items-center'>
                    <div className="flex flex-col w-3/5">
                        <h1 className='font-medium text-xl'>Barcode</h1>
                        <span className='p-2 border-2 rounded-md border-gray-400 text-lg tracking-wide my-2 min-h-12'>{barcode}</span>
                    </div>
                    <button className='bg-indigo-700 w-1/5 h-2/3 text-white p-2 transition-all hover:bg-indigo-800 rounded-md text-lg hover:font-semibold' onClick={() => createBarcode()}>Generate Barcode</button>
                    <button className='bg-white-700 border-2 w-1/5 h-2/3 p-2 rounded-md text-lg transition-all hover:bg-gray-100 hover:font-semibold' onClick={() => setBarcode('')}>Clear Barcode</button>
                </div>

                <div className='shadow-md rounded-md w-full h-full flex flex-col p-5 bg-white justify-center items-center'>
                    <div ref={componentRef} className={`${barcode ? 'border-2' : ''} rounded-md p-5 min-w-80 min-h-58 justify-center items-center flex`}>
                        {barcode ? <Barcode value={barcode} width={'2.3'} /> : <span>No barcode</span>}
                    </div>
                    <ReactToPrint
                        trigger={() => <button className='border-indigo-700 transition-all hover:bg-indigo-700 hover:text-white border-2 p-2 rounded-md w mt-5 flex items-center gap-2'>Print Barcode <FaPrint /></button>}
                        content={() => componentRef.current}
                    />
                </div>
            </div>
        </div>
    )
}

export default GenerateBarcode