export default interface IButtonProps {
    children: React.ReactNode;
    active?: boolean | (() => boolean);
    className?: string;
    onClick?: any;
    disabled?: boolean;
}
