import axios from 'axios';
import queryString from 'query-string';
import { ContentManagerInterface, ContentManagerGetQueryInterface } from 'interfaces/content-manager';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getContentManagers = async (
  query?: ContentManagerGetQueryInterface,
): Promise<PaginatedInterface<ContentManagerInterface>> => {
  const response = await axios.get('/api/content-managers', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createContentManager = async (contentManager: ContentManagerInterface) => {
  const response = await axios.post('/api/content-managers', contentManager);
  return response.data;
};

export const updateContentManagerById = async (id: string, contentManager: ContentManagerInterface) => {
  const response = await axios.put(`/api/content-managers/${id}`, contentManager);
  return response.data;
};

export const getContentManagerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/content-managers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteContentManagerById = async (id: string) => {
  const response = await axios.delete(`/api/content-managers/${id}`);
  return response.data;
};
