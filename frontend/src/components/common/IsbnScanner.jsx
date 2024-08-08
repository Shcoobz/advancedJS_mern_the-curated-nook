import { useEffect, useRef, useState } from 'react';
import Quagga from 'quagga';

function IsbnScanner({ onDetected, onClose }) {
  const scannerRef = useRef(null);
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: scannerRef.current,
          constraints: {
            width: 1280,
            height: 720,
            facingMode: 'environment',
          },
        },
        locator: {
          patchSize: 'medium',
          halfSample: true,
        },
        numOfWorkers: 2,
        decoder: {
          readers: ['ean_reader'],
        },
        locate: true,
      },
      (err) => {
        if (err) {
          console.error(err);
          setError('Failed to initialize scanner. Please check your camera permissions.');
          setIsScanning(false);
          return;
        }
        Quagga.start();

        setTimeout(() => {
          const videoCanvas = scannerRef.current.querySelector('canvas');
          if (videoCanvas) {
            videoCanvas.setAttribute('willReadFrequently', 'true');
          }
        }, 500);
      }
    );

    Quagga.onDetected((result) => {
      console.log(result);

      if (result.codeResult.code && isScanning) {
        setIsScanning(false);
        onDetected(result.codeResult.code);
        Quagga.stop();
      }
    });

    return () => {
      Quagga.stop();
      setIsScanning(false);
    };
  }, [onDetected, isScanning]);

  return (
    <div className='barcode-scanner'>
      {error ? (
        <div className='error-message'>{error}</div>
      ) : (
        <>
          <div ref={scannerRef} className='viewport' />
          <div className='scanner-overlay'>
            <p>Align barcode within the frame</p>
          </div>
        </>
      )}
      <button onClick={onClose}>Close Scanner</button>
    </div>
  );
}

export default IsbnScanner;
