export interface InputType {
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  haveError: boolean;
}

export interface BtnType {
  content: string;
  isActive: boolean;
  action?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  isLoading?: boolean;
}

export enum HTTPRequest {
  POST,
  GET,
}

export enum TypeResponse {
  SUCCESS,
  ERROR,
}

export interface RResponseType {
  type: TypeResponse;
  data?: unknown;
  message: string;
}

export interface LoginErrorType {
  message: string;
  errCode: string;
}

export interface LoginType {
  message: string;
  user: UserType;
}

export interface UserType {
  id: number;
  username: string;
  email: string;
  token: string;
}

export interface UserContextType {
  user?: UserType;
  updateUser: (data: UserType) => void;
}
