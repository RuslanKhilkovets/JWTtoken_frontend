import { Dayjs } from "dayjs";

export default interface IFormData {
    place: string;
    surname: string;
    name: string;
    patronymic: string;
    phone: string;
    gender: "Мужской" | "Женский" | "";
    birthdayDate: Dayjs | string | null;
    email: string;
    paymentMethod: "На сайті" | "В ЕРІП" | "На місці" | "";
}