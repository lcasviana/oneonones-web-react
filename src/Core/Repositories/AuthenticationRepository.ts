import axios, { AxiosError, AxiosResponse } from 'axios';
import { Configuration } from '../../Common/Constants/Configuration';
import { ErrorModel } from '../../Common/Models/ErrorModel';
import { LoginModel } from '../../Common/Models/LoginModel';
import { UserModel } from '../../Common/Models/UserModel';
import sha512 from 'crypto-js/sha512';
import encHex from 'crypto-js/enc-hex';

export class AuthenticationRepository {
  private static readonly baseUrl = `${Configuration.oneononeApi}/accounts`;

  public static async login(login: LoginModel): Promise<UserModel> {
    login.password = sha512(login.password).toString(encHex);
    return axios.post<LoginModel, AxiosResponse<UserModel>>(`${AuthenticationRepository.baseUrl}/login?encrypted=true`, login)
      .then(({ data }: AxiosResponse<UserModel>) => Promise.resolve(data))
      .catch((err: Error | AxiosError<ErrorModel>) =>
        axios.isAxiosError(err)
          ? Promise.reject(err?.response?.data)
          : Promise.reject({ errors: [err.message] } as ErrorModel)
      );
  }
}