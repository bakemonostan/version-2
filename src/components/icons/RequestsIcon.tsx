import { SVGIconProps } from ".";

export default function RequestsIcon({
  className,
  width = 24,
  height = 24,
}: SVGIconProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 12L11 15L16 9M20 7.19995V16.8C20 17.9201 20.0002 18.4802 19.7822 18.908C19.5905 19.2844 19.2841 19.5902 18.9078 19.782C18.48 20 17.9203 20 16.8002 20H7.2002C6.08009 20 5.51962 20 5.0918 19.782C4.71547 19.5902 4.40973 19.2844 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V7.19995C4 6.07985 4 5.51986 4.21799 5.09204C4.40973 4.71572 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.48 4 18.9078 4.21799C19.2841 4.40973 19.5905 4.71572 19.7822 5.09204C20.0002 5.51986 20 6.07985 20 7.19995Z"
        stroke="black"
        strokeOpacity="0.8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
