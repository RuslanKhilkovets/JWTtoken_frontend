import { emailRegex } from "../regex/emailRegex";
import { passwordRegex } from "../regex/passwordRegex";

export function validateEmail(email: string) {
    return emailRegex.test(email);
}

export function validatePassword(password: string) {
    return passwordRegex.test(password);
} 