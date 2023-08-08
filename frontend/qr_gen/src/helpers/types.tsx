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

export enum TypeQr {
  Link = "lien",
  ContactCard = "Contact Card",
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
  id?: number | null;
  username?: string | null;
  email?: string | null;
  token?: string | null;
}

export interface UserContextType {
  user?: UserType | null;
  updateUser: (data: UserType) => void;
}

export interface ItemMenuType {
  element: JSX.Element;
  icon: string;
  label: string;
  route: string;
}

export interface QrType {
  url: string;
  date: Date;
  typeQr: string;
}

export interface GenQrResponseType {
  data: QrType;
  message: string;
}

export interface ResponseOwType {
  response: boolean;
  url: string;
}

export interface QrTypeContact {
  message: string;
  data: QrType;
}
