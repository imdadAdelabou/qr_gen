
export interface InputType {
    hintText: string;
    typeInput: "text" | "password" | "email"
}

export interface BtnType {
    content: string;
    isActive: boolean;
    action: () => void;
}