import { AdministratorInterface } from 'interfaces/administrator';
import { GetQueryInterface } from 'interfaces';

export interface WatermarkInterface {
  id?: string;
  design: string;
  placement: string;
  administrator_id: string;
  created_at?: any;
  updated_at?: any;

  administrator?: AdministratorInterface;
  _count?: {};
}

export interface WatermarkGetQueryInterface extends GetQueryInterface {
  id?: string;
  design?: string;
  placement?: string;
  administrator_id?: string;
}
