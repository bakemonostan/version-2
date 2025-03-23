import { SVGIconProps } from ".";

const TwoWheelerIcon = ({
  className,
  width = 36,
  height = 36,
}: SVGIconProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.75 14.625C24.3544 14.625 23.9588 14.6756 23.5856 14.7319L21.3075 11.25H24.75V9H19.125V7.875C19.125 7.05375 18.4463 6.375 17.625 6.375C16.8038 6.375 16.125 7.05375 16.125 7.875V9H13.5V11.25H17.0663L18.2587 13H11.25L10.6594 11.6963C11.6812 11.1094 12.375 10.0463 12.375 8.8125C12.375 7.05375 10.9462 5.625 9.1875 5.625C7.42875 5.625 6 7.05375 6 8.8125C6 10.5713 7.42875 12 9.1875 12C9.26062 12 9.33375 12 9.40688 11.9887L10.3781 14.3306L7.875 18H6V20.25H9.1875C9.64688 20.25 10.0763 20.0494 10.3331 19.7025L12.375 16.8075L14.8219 20.25H24.75C27.2475 20.25 29.25 18.2475 29.25 15.75C29.25 15.075 29.0944 14.4225 28.8375 13.8375C27.9 14.2987 26.8706 14.625 25.7625 14.625H24.75ZM9.1875 9.75C8.68312 9.75 8.25 9.31688 8.25 8.8125C8.25 8.30812 8.68312 7.875 9.1875 7.875C9.69188 7.875 10.125 8.30812 10.125 8.8125C10.125 9.31688 9.69188 9.75 9.1875 9.75ZM24.75 18H16.3969L13.95 14.625H18.7462L19.125 15.1875L22.275 17.1C22.7137 17.4019 23.2312 17.5688 23.7938 17.625C23.9944 17.8819 24.3319 18 24.75 18Z"
        fill="currentColor"
      />
      <path
        d="M28.125 28.125C25.8525 28.125 24 26.2725 24 24C24 21.7275 25.8525 19.875 28.125 19.875C30.3975 19.875 32.25 21.7275 32.25 24C32.25 26.2725 30.3975 28.125 28.125 28.125ZM28.125 22.125C27.0862 22.125 26.25 22.9613 26.25 24C26.25 25.0388 27.0862 25.875 28.125 25.875C29.1638 25.875 30 25.0388 30 24C30 22.9613 29.1638 22.125 28.125 22.125Z"
        fill="currentColor"
      />
      <path
        d="M11.25 28.125C8.9775 28.125 7.125 26.2725 7.125 24C7.125 21.7275 8.9775 19.875 11.25 19.875C13.5225 19.875 15.375 21.7275 15.375 24C15.375 26.2725 13.5225 28.125 11.25 28.125ZM11.25 22.125C10.2113 22.125 9.375 22.9613 9.375 24C9.375 25.0388 10.2113 25.875 11.25 25.875C12.2887 25.875 13.125 25.0388 13.125 24C13.125 22.9613 12.2887 22.125 11.25 22.125Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default TwoWheelerIcon; 
