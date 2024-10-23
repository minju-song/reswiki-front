export const loadGoogleMaps = () => {
    return new Promise<void>((resolve, reject) => {
        if (window.google && window.google.maps) {
            console.warn("Google Maps already loaded.");
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBvQW-CP5ovvNRqOlCP6YWMc85tEQS839o&libraries=places`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            resolve();
        };

        script.onerror = () => {
            reject(new Error("Google Maps JavaScript API could not load."));
        };

        document.head.appendChild(script);
    });
};