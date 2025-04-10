import { SVGIconProps } from ".";

export default function NotificationsIcon({
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
    >
      <path
        d="M4.41406 14.5858L4.80357 14.1963C4.92924 14.0706 5 13.9002 5 13.7224V10C5 6.13401 8.13401 3.00001 12 3C15.866 2.99999 19 6.134 19 10V13.7224C19 13.9001 19.0706 14.0706 19.1963 14.1963L19.5858 14.5858C19.7051 14.7051 19.7649 14.7648 19.8124 14.831C19.9023 14.9561 19.9619 15.1003 19.9868 15.2523C20 15.3328 20.0002 15.4171 20.0002 15.5858C20.0002 15.9714 20.0002 16.1642 19.9478 16.3197C19.848 16.6155 19.6156 16.8477 19.3198 16.9475C19.1643 17 18.9712 17 18.5856 17H5.41406C5.02852 17 4.83568 17 4.68018 16.9475C4.38431 16.8477 4.15225 16.6155 4.05245 16.3196C4 16.1641 4 15.9714 4 15.5858C4 15.4171 4 15.3328 4.0132 15.2523C4.03815 15.1003 4.09766 14.9561 4.1875 14.831C4.23504 14.7648 4.29476 14.7051 4.41406 14.5858ZM15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17H15Z"
        stroke="black"
        strokeOpacity="0.8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
