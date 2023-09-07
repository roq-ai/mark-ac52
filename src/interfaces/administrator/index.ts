import { WatermarkInterface } from 'interfaces/watermark';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AdministratorInterface {
  id?: string;
  name: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  watermark?: WatermarkInterface[];
  user?: UserInterface;
  _count?: {
    watermark?: number;
  };
}

export interface AdministratorGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  user_id?: string;
}
