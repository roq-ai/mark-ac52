import { ContentCreatorInterface } from 'interfaces/content-creator';
import { GetQueryInterface } from 'interfaces';

export interface ContentInterface {
  id?: string;
  title: string;
  description?: string;
  content_creator_id: string;
  created_at?: any;
  updated_at?: any;

  content_creator?: ContentCreatorInterface;
  _count?: {};
}

export interface ContentGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  content_creator_id?: string;
}
