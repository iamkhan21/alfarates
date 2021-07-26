import {createContext} from "preact";
import EntrancePoint from "@services/index";

export const instance = EntrancePoint.getInstance();
export const ServicesContext = createContext(instance);
