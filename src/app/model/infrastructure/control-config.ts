import { ControlValidator } from './control-validator';

export interface ControlConfig {
  key: string;
  validatorList?: ControlValidator[];
}
