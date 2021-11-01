import { AppErrorConfig } from "src/app/model/infrastructure/app-error-config";
import { autErrorConfig } from "./auth-error-config";
import { commonErrorConfig } from "./common-error-config";
import { userErrorConfig } from './user-error-config';

export const coraErrorConfig: AppErrorConfig = {
  errors:[
    commonErrorConfig,
    autErrorConfig,
    userErrorConfig
  ]
}
