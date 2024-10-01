import React, { useRef, useState } from "react";
import "./weather.css";
import searchIcon from "../../assets/search.png";
import humidityIcon from "../../assets/humidity.png";
import windIcon from "../../assets/wind.png";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchCurrentWeather } from "../../api/apiClient";
import LoadingOverlay from "../../components/Loading/LoadingOverlay";
import useSearchHistory from "../../hooks/useSearchHistory";

const Weather = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [city, setCity] = useState("");
  const [selectedTemp, setSelectedTemp] = useState("temp_c");
  const { searchHistory, addCityToHistory } = useSearchHistory();

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchCurrentWeather(city),
    enabled: city !== "",
    placeholderData: keepPreviousData,
    retry: 0,
  });

  const handleSubmit = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (inputRef.current) {
      const newCity = inputRef.current.value;
      setCity(newCity);
      addCityToHistory(newCity);
    }
  };

  const handleSelectTempUnit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTemp(e.target.value);
  };

  const handleClickHistory = (historyCity: string) => {
    setCity(historyCity);
    if (inputRef.current) {
      inputRef.current.value = historyCity; // Fill input with clicked history
    }
  };

  return (
    <div className={`weather`}>
      <div className="search-history">
        {searchHistory.map((history: string, index: number) => {
          return (
            <button
              key={`${index + history}`}
              onClick={() => handleClickHistory(history)}
            >
              {history}
            </button>
          );
        })}
      </div>

      <form action="" onSubmit={handleSubmit as any}>
        <div className="search-bar">
          <input type="text" placeholder="Search City" ref={inputRef} />
          <button type="submit">
            <img src={searchIcon} alt="search" />
          </button>
        </div>
      </form>
      {isError && <p className="error">No Matching Found</p>}
      {data ? (
        <>
          <p>{data.current.condition.text}</p>
          <img
            src={data?.current.condition.icon}
            alt=""
            className="weather-icon"
          />
          <p className="temperature">
            {selectedTemp === "temp_c"
              ? data?.current.temp_c
              : data?.current.temp_f}
            <select
              id="temperature"
              value={selectedTemp}
              onChange={handleSelectTempUnit}
            >
              <option value="temp_c">&#8451;</option>
              <option value="temp_f">&#8457;</option>
            </select>
          </p>
          <p className="location">{data?.location.name}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidityIcon} alt="humidity" />
              <div>
                <p>{data?.current.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={windIcon} alt="humidity" />
              <div>
                <p>{data?.current.wind_kph} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      <LoadingOverlay isLoading={isLoading || isFetching} />
    </div>
  );
};

export default Weather;
