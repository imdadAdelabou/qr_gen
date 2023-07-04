import { useState } from "react";
import axios, { AxiosError } from "axios";
import { APP_MESSAGE, BASE_API_URL } from "../helpers/constants";
import { LoginErrorType, TypeResponse } from "../helpers/types";
import openToast from "../helpers/functions";

function useSubmit() {
  const [isLoading, setLoading] = useState(false);

  const submit = async (
    url: string,
    data: unknown,
    action: (data: unknown) => void
  ) => {
    try {
      setLoading(true);
      const result = await axios.post(`${BASE_API_URL}${url}`, data, {
        headers: { "Content-type": "application/json" },
      });
      if (result.status == 200 || result.status == 201) {
        action(result.data);
      }

      openToast(APP_MESSAGE.successLabel, TypeResponse.SUCCESS);
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status == 404) {
        openToast(APP_MESSAGE.userDontExist, TypeResponse.ERROR);
        return;
      }

      if (
        error.response &&
        error.response?.status == 400 &&
        (error.response.data as LoginErrorType).errCode == "wrong-password"
      ) {
        openToast(APP_MESSAGE.wrongPassword, TypeResponse.ERROR);
        return;
      }

      if (error.response && error.response.status == 409) {
        openToast(APP_MESSAGE.userAlreadyExist, TypeResponse.ERROR);
        return;
      }

      if (error.response && error.response.status == 500) {
        openToast(APP_MESSAGE.internalServorError, TypeResponse.ERROR);
        return;
      }

      openToast(APP_MESSAGE.timeOutErrorMessage, TypeResponse.ERROR);
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, submit };
}

export default useSubmit;
