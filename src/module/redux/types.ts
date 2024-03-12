import { ValidationError } from "@ofqual/portal-core/core/types";

export enum UserType {
  Unknown = 0,
  Ofqual = 1,
  CCEA = 2,
  AO = 3,
}

export type NoCrudResult = {
  isSuccess: null;
};

export type SuccessCrudResult = {
  isSuccess: true;
};

export type FailedCrudResult = {
  isSuccess: false;
  errorState: ValidationError;
};

export type CrudResult = NoCrudResult | SuccessCrudResult | FailedCrudResult;

export const noCrudResult = () =>
  ({
    isSuccess: null,
  } as NoCrudResult);

export const successCrudResult = () =>
  ({
    isSuccess: true,
  } as SuccessCrudResult);

export const failedCrudResult = (validationError: ValidationError) =>
  ({
    isSuccess: false,
    errorState: validationError,
  } as FailedCrudResult);
