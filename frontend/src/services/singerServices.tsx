import axios from "axios";
import { SingerData } from "@/interface/singer";

const API_URL = "http://localhost:3200";

export const getSingers = async () => {
  const response = await axios.get(`${API_URL}/singers`);
  return response;
};

export const getSingerById = async (id: number) => {
  const response = await axios.get(`${API_URL}/singers/${id}`);
  return response.data;
};

export const createSinger = async (singerData: SingerData): Promise<any> => {
  const age = typeof singerData.age === 'string' ? parseInt(singerData.age, 10) : singerData.age;
  const correctedSingerData = { ...singerData, age };

  const response = await axios.post(`${API_URL}/singers`, correctedSingerData);
  return response.data;
};

export const updateSinger = async (id: number, singerData: SingerData): Promise<any> => {
  // Convertir el campo 'age' a un número si es una cadena de texto
  const age = typeof singerData.age === 'string' ? parseInt(singerData.age, 10) : singerData.age;
  const correctedSingerData = { ...singerData, age };

  const response = await axios.put(`${API_URL}/singers/${id}`, correctedSingerData);
  return response.data;
};


export const deleteSinger = async (id: number) => {
  const response = await axios.delete(`${API_URL}/singers/${id}`);
  return response.data;
};
