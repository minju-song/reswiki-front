// src/types/IPlace.ts
export interface IPlace {
    results: Array<{
        place_id: string;
        name: string;
        formatted_address: string;
        rating?: number;
        photos?: Array<{
            photo_reference: string;
            width: number;
            height: number;
        }>;
        geometry: {
            location: {
                lat: number;
                lng: number;
            };
        };
    }>;
}
