import { useState } from "react";
import axios, { AxiosError } from "axios";
import { APP_MESSAGE, BASE_API_URL } from "../helpers/constants";
import { LoginErrorType, RResponseType, TypeResponse } from "../helpers/types";

function useSubmit() {
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState<RResponseType | null>(null);

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
      setResponse({
        type: TypeResponse.SUCCESS,
        message: APP_MESSAGE.successLabel,
      });
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status == 404) {
        setResponse({
          message: APP_MESSAGE.userDontExist,
          type: TypeResponse.ERROR,
        });
      }
      if (
        error.response &&
        error.response?.status == 400 &&
        (error.response.data as LoginErrorType).errCode == "wrong-password"
      ) {
        setResponse({
          type: TypeResponse.ERROR,
          message: APP_MESSAGE.wrongPassword,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, response, submit };
}

export default useSubmit;
