import axios from 'axios';
import queryString from 'query-string';
import { WatermarkInterface, WatermarkGetQueryInterface } from 'interfaces/watermark';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getWatermarks = async (
  query?: WatermarkGetQueryInterface,
): Promise<PaginatedInterface<WatermarkInterface>> => {
  const response = await axios.get('/api/watermarks', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createWatermark = async (watermark: WatermarkInterface) => {
  const response = await axios.post('/api/watermarks', watermark);
  return response.data;
};

export const updateWatermarkById = async (id: string, watermark: WatermarkInterface) => {
  const response = await axios.put(`/api/watermarks/${id}`, watermark);
  return response.data;
};

export const getWatermarkById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/watermarks/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteWatermarkById = async (id: string) => {
  const response = await axios.delete(`/api/watermarks/${id}`);
  return response.data;
};
