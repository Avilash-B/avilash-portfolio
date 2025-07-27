import { useEffect } from 'react';

const TELEMETRY_SENT_KEY = 'source_key';

export const useTelemetry = () => {
  useEffect(() => {
    const sendTelemetry = async () => {
      // Check if telemetry has already been sent
      if (localStorage.getItem(TELEMETRY_SENT_KEY)) {
        return;
      }
      // Mark telemetry as sent
      localStorage.setItem(TELEMETRY_SENT_KEY, 'true');

      // Get the source query parameter
      const urlParams = new URLSearchParams(window.location.search);
      const sourcevalue = urlParams.get('src');
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      let source : number = 0;

      switch(sourcevalue){
        case "li" : source = 1;
        break;
        case "in" : source = 2;
        break;
        case "re" : source = 3;
        break;
        case "gir" : source = 4;
        break;
        default: source = -1
      }

      if (source !== -1) {
        try {

          // Send telemetry data
          await fetch(`${baseUrl}/anonymous/source`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ source }),
          });
          
        } catch (error) {
          console.error('Failed to send telemetry:', error);
        }
      }
    };

    sendTelemetry();
  }, []); // Empty dependency array ensures it only runs once
};