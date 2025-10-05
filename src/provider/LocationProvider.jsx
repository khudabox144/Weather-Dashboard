import React, { useState } from 'react';
import { searchLocationContext } from '../context';
const LocationProvider = ({children}) => {
    const [selectedLocation,setSelectedLocation]=useState("");
    
    return (
        <searchLocationContext.Provider value={{selectedLocation,setSelectedLocation}}>
            {
                children
            }
        </searchLocationContext.Provider>
    );
};

export default LocationProvider;