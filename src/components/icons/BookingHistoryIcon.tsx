import { SVGIconProps } from ".";

const BookingHistoryIcon = ({ className, width = 24, height = 24 }: SVGIconProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 9.80005V20M12 9.80005C12 8.11989 12 7.2798 12.327 6.63806C12.6146 6.07358 13.0737 5.6146 13.6382 5.32698C14.2799 5 15.1196 5 16.7998 5H19.3998C19.9599 5 20.24 5 20.4539 5.10899C20.6421 5.20487 20.7952 5.35786 20.8911 5.54602C21.0001 5.75993 21 6.03992 21 6.59998V15.4C21 15.96 21.0001 16.2401 20.8911 16.454C20.7952 16.6422 20.6421 16.7951 20.4539 16.891C20.24 17 19.96 17 19.4 17H16.5688C15.6296 17 15.1602 17 14.7339 17.1295C14.3565 17.2441 14.0055 17.432 13.7008 17.6824C13.3567 17.9652 13.096 18.356 12.575 19.1375L12 20M12 9.80005C12 8.11989 11.9998 7.2798 11.6729 6.63806C11.3852 6.07358 10.9267 5.6146 10.3622 5.32698C9.72043 5 8.88026 5 7.2001 5H4.6001C4.04005 5 3.75981 5 3.5459 5.10899C3.35774 5.20487 3.20487 5.35786 3.10899 5.54602C3 5.75993 3 6.03992 3 6.59998V15.4C3 15.96 3 16.2401 3.10899 16.454C3.20487 16.6422 3.35774 16.7951 3.5459 16.891C3.75981 17 4.04005 17 4.6001 17H7.43122C8.37043 17 8.83997 17 9.26624 17.1295C9.64361 17.2441 9.99463 17.432 10.2993 17.6824C10.6435 17.9652 10.9038 18.356 11.4248 19.1375L12 20"
        stroke="black"
        strokeOpacity="0.8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BookingHistoryIcon;
