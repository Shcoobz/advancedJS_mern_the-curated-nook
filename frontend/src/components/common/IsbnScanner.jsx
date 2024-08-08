import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, BarcodeFormat } from '@zxing/library';

function IsbnScanner({ onDetected, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [codeReader] = useState(
    () =>
      new BrowserMultiFormatReader(
        new Map([[BarcodeFormat.POSSIBLE_FORMATS, [BarcodeFormat.EAN_13]]])
      )
  );

  const processImage = (videoElement) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas size to match video
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    // Draw original video frame
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Apply image processing
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const processed = enhanceBarcode(imageData);
    context.putImageData(processed, 0, 0);
  };

  const enhanceBarcode = (imageData) => {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const threshold = 128;
      const value = avg > threshold ? 255 : 0;
      data[i] = data[i + 1] = data[i + 2] = value;
    }
    return imageData;
  };

  useEffect(() => {
    const startScanning = async () => {
      try {
        const videoInputDevices = await codeReader.listVideoInputDevices();
        if (videoInputDevices.length === 0) {
          throw new Error('No video input devices found');
        }
        const selectedDeviceId = videoInputDevices[0].deviceId;
        await codeReader.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current,
          (result, err) => {
            if (result) {
              const scannedCode = result.getText();
              if (scannedCode.length === 13 && /^\d+$/.test(scannedCode)) {
                onDetected(scannedCode);
                codeReader.reset();
                onClose();
              }
            }
            if (err && !(err instanceof TypeError)) {
              console.error('Barcode scan error:', err);
            }
          }
        );

        const captureAndProcess = () => {
          if (videoRef.current && canvasRef.current) {
            processImage(videoRef.current);
          }
          requestAnimationFrame(captureAndProcess);
        };

        captureAndProcess();
      } catch (error) {
        console.error('Error initializing barcode scanner:', error);
      }
    };

    startScanning();

    return () => {
      codeReader.reset();
    };
  }, [codeReader, onDetected, onClose]);

  return (
    <div className='isbn-scanner'>
      <video
        ref={videoRef}
        style={{ width: '100%', display: 'none' }}
        autoPlay
        playsInline
      />
      <canvas ref={canvasRef} style={{ width: '100%' }} />
      <button
        onClick={() => {
          codeReader.reset();
          onClose();
        }}>
        Close Scanner
      </button>
    </div>
  );
}

export default IsbnScanner;
