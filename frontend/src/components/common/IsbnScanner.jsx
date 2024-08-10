import { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, BarcodeFormat } from '@zxing/library';

function IsbnScanner({ onDetected, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);

  const [codeReader] = useState(function () {
    return new BrowserMultiFormatReader(
      new Map([[BarcodeFormat.POSSIBLE_FORMATS, [BarcodeFormat.EAN_13]]])
    );
  });

  const roiWidth = 200;
  const roiHeight = 100;

  function roiX() {
    return canvasRef.current.width / 2 - roiWidth / 2;
  }

  function roiY() {
    return canvasRef.current.height / 2 - roiHeight / 2;
  }

  const processImage = (videoElement) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    context.drawImage(
      videoElement,
      roiX(),
      roiY(),
      roiWidth,
      roiHeight,
      0,
      0,
      roiWidth,
      roiHeight
    );

    const imageData = context.getImageData(0, 0, roiWidth, roiHeight);
    const processed = enhanceBarcode(imageData);

    context.putImageData(processed, 0, 0);
  };

  function enhanceBarcode(imageData) {
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const threshold = 128;
      const value = avg > threshold ? 255 : 0;
      data[i] = data[i + 1] = data[i + 2] = value;
    }

    return imageData;
  }

  useEffect(() => {
    async function startScanning() {
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

      function captureAndProcess() {
        if (videoRef.current && canvasRef.current) {
          processImage(videoRef.current);
        }

        requestAnimationFrame(captureAndProcess);
      }

      captureAndProcess();
    }

    startScanning();

    return () => {
      codeReader.reset();
    };
  }, [codeReader, onDetected, onClose]);

  return (
    <div className='isbn-scanner'>
      <video ref={videoRef} style={{ width: '100%' }} autoPlay playsInline />
      <canvas ref={canvasRef} style={{ width: '100%', display: 'none' }} />
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${roiWidth}px`,
          height: `${roiHeight}px`,
          border: '2px solid red',
          transform: 'translate(-50%, -50%)',
        }}></div>
      <div>Align barcode within red area</div>
      <button
        className='scan-btn-close'
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
