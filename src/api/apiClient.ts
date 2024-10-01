import { WeatherResponse } from '../types/weatherTypes';
import axiosInstance from './axiosInstance';

const API_KEY = "813368150ac0481684d35451240110" // will be in env

export const fetchCurrentWeather = async (city: string): Promise<WeatherResponse> => {
    const response = await axiosInstance.get(`/current.json?key=${API_KEY}&q=${city}`);
    return response.data;
};