import { useState } from 'react';

const useSearchHistory = () => {
    const [searchHistory, setSearchHistory] = useState(() => {
        // Retrieve search history from local storage
        const storedHistory = localStorage.getItem('searchHistory');
        return storedHistory ? JSON.parse(storedHistory) : [];
    });

    const addCityToHistory = (city: string) => {
        if (city) {
            // Check if the city is already in history
            const updatedHistory = searchHistory.filter((item: string) => item !== city);
            // Add the new city to the beginning of the array
            updatedHistory.unshift(city);
            // Keep only the last 3 cities
            const limitedHistory = updatedHistory.slice(0, 3);
            setSearchHistory(limitedHistory);
            localStorage.setItem('searchHistory', JSON.stringify(limitedHistory));
        }
    };

    return { searchHistory, addCityToHistory };
};

export default useSearchHistory;