import { validateEmptyPropertiesError } from "./validateEmptyPropertiesError";

export interface validateEmptyPropertiesOutput {
  isValid: boolean;
  errors: validateEmptyPropertiesError[];
}
