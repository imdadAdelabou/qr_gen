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
