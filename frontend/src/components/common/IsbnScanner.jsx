import { useEffect, useRef } from 'react';
import { BrowserMultiFormatReader, BarcodeFormat } from '@zxing/library';

function IsbnScanner({ onDetected, onClose }) {
  const videoRef = useRef(null);
  const formats = [BarcodeFormat.EAN_13]; // Only looking for EAN-13 barcode formats
  const hints = new Map();
  hints.set(BarcodeFormat.POSSIBLE_FORMATS, formats);
  const codeReader = new BrowserMultiFormatReader(hints);

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
              onDetected(result.getText());
              codeReader.reset();
              onClose();
            }
            if (err) {
              // Ignore NotFoundException entirely in the console log
              if (!/NotFoundException\d*:/.test(err.message)) {
                console.error('Barcode scan error:', err);
              }
            }
          }
        );
      } catch (error) {
        console.error('Error initializing barcode scanner:', error);
      }
    };

    startScanning();

    return () => {
      codeReader.reset();
    };
  }, [onDetected, onClose]);

  return (
    <div className='isbn-scanner'>
      <video ref={videoRef} style={{ width: '100%' }} />
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
