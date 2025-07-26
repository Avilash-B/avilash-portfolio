import { useEffect } from 'react';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
const TELEMETRY_ENDPOINT = `${baseUrl}/anonymous/source`; // You'll need to create this endpoint
const TELEMETRY_SENT_KEY = 'source_key';

export const useTelemetry = () => {
  useEffect(() => {
    const sendTelemetry = async () => {
      // Check if telemetry has already been sent
      if (localStorage.getItem(TELEMETRY_SENT_KEY)) {
        return;
      }

      // Get the source query parameter
      const urlParams = new URLSearchParams(window.location.search);
      const source = urlParams.get('src');

      if (source) {
        try {
          // Send telemetry data
          await fetch(TELEMETRY_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ source }),
          });

          // Mark telemetry as sent
          localStorage.setItem(TELEMETRY_SENT_KEY, 'true');
        } catch (error) {
          console.error('Failed to send telemetry:', error);
        }
      }
    };

    sendTelemetry();
  }, []); // Empty dependency array ensures it only runs once
};