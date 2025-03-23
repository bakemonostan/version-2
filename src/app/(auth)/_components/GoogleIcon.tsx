import { SVGIconProps } from '../../../components/icons/index';

export default function GoogleIcon({
  className,
  width = 32,
  height = 33,
}: SVGIconProps) { 
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_4235_28291"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="32"
        height="33"
      >
        <path d="M31.7974 0H0.202606V32.2343H31.7974V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_4235_28291)">
        <path
          d="M31.7977 16.4864C31.7977 15.3908 31.7088 14.2893 31.5192 13.2114H16.3171V19.4179H25.0226C24.6613 21.4196 23.5007 23.1903 21.801 24.3154V28.3425H26.9947C30.0447 25.5354 31.7977 21.3899 31.7977 16.4864Z"
          fill="#4285F4"
        />
        <path
          d="M16.3171 32.2336C20.6639 32.2336 24.3298 30.8063 27.0005 28.3426L21.8069 24.3156C20.3619 25.2987 18.4964 25.8554 16.323 25.8554C12.1183 25.8554 8.55312 23.0186 7.27393 19.2048H1.91437V23.3562C4.65042 28.7988 10.2232 32.2336 16.3171 32.2336Z"
          fill="#34A853"
        />
        <path
          d="M7.26801 19.2051C6.59288 17.2035 6.59288 15.0359 7.26801 13.0343V8.88281H1.91439C-0.371568 13.437 -0.371568 18.8024 1.91439 23.3565L7.26801 19.2051Z"
          fill="#FBBC04"
        />
        <path
          d="M16.3171 6.37754C18.6149 6.34201 20.8357 7.20663 22.4998 8.79379L27.1013 4.19226C24.1877 1.45623 20.3204 -0.0480001 16.3171 -0.000622872C10.2231 -0.000622872 4.65042 3.43423 1.91437 8.88262L7.268 13.0341C8.54125 9.21425 12.1123 6.37754 16.3171 6.37754Z"
          fill="#EA4335"
        />
      </g>
    </svg>
  );
}
