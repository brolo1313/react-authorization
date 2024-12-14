import { IFormState } from "../models/auth";

export const optionalSetFormState = (
  formValue: Partial<IFormState>,
  formState: React.Dispatch<React.SetStateAction<Partial<IFormState>>>
) => {
  formState((prevState) => ({
    ...prevState,
    ...formValue,
  }));
};
