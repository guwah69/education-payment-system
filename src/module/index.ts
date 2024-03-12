import { API_ROOT_ORGS } from "../config";
import { Component } from "./presentation/Component";
import { redux } from "./redux";
import { OrgsService } from "./services/business/OrgsService";

export const orgsService = new OrgsService(API_ROOT_ORGS);

export const moduleDefinition = {
  component: Component,
  redux,
};
