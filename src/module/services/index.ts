import { API_ROOT_COMMS } from "../../config";
import { ActivitiesService } from "./business/ActivitesService";

export const activitiesService = new ActivitiesService(API_ROOT_COMMS);
