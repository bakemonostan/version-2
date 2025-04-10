import React from "react";
import { SVGIconProps } from ".";

export default function ConvenienceClockIcon(props: SVGIconProps) {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M54.775 26.3819C55.839 30.1166 56.0221 34.0472 55.31 37.8647C54.5978 41.6822 53.0099 45.2825 50.671 48.3825C48.3321 51.4824 45.306 53.9976 41.8306 55.7303C38.3553 57.4629 34.5253 58.3658 30.642 58.3679C-2.64844 57.0003 -2.66828 9.54461 30.6418 8.16975C33.6068 8.16411 36.549 8.68747 39.3302 9.71525C38.8933 10.4926 38.5431 11.3156 38.2859 12.1693C38.088 12.8489 37.9482 13.5441 37.8682 14.2474C35.8903 13.4854 33.8032 13.0447 31.6861 12.9421V14.0803C31.6861 14.3573 31.5761 14.6229 31.3802 14.8187C31.1844 15.0146 30.9188 15.1246 30.6418 15.1246C30.3649 15.1246 30.0993 15.0146 29.9034 14.8187C29.7076 14.6229 29.5976 14.3573 29.5976 14.0803V12.9421C24.9236 13.1716 20.4734 15.013 17.0037 18.153L17.8077 18.9571C17.9988 19.1535 18.105 19.4171 18.1036 19.6911C18.1022 19.9651 17.9933 20.2276 17.8002 20.422C17.6071 20.6164 17.3454 20.7273 17.0715 20.7306C16.7975 20.734 16.5331 20.6296 16.3354 20.44L15.5313 19.6359C12.3901 23.1017 10.5453 27.5478 10.3099 32.2193C10.3046 32.2267 11.4504 32.2193 11.4503 32.2218C11.7248 32.2256 11.9867 32.3373 12.1794 32.5328C12.3722 32.7282 12.4802 32.9916 12.4802 33.2661C12.4802 33.5406 12.3722 33.804 12.1794 33.9995C11.9867 34.1949 11.7248 34.3066 11.4503 34.3104H10.3102C10.5459 38.981 12.3907 43.4262 15.5313 46.8913L16.3354 46.0976C16.432 46.0008 16.5467 45.924 16.673 45.8716C16.7994 45.8192 16.9348 45.7922 17.0715 45.7922C17.2083 45.7922 17.3437 45.8192 17.4701 45.8716C17.5964 45.924 17.7111 46.0008 17.8077 46.0976C18.6369 47.0118 17.638 47.7386 17.0141 48.3742C20.4781 51.5164 24.9237 53.3614 29.5946 53.5953V52.4541C29.5984 52.1796 29.7101 51.9177 29.9055 51.725C30.1009 51.5322 30.3644 51.4242 30.6388 51.4242C30.9133 51.4242 31.1768 51.5322 31.3722 51.725C31.5676 51.9177 31.6793 52.1796 31.6831 52.4541C31.6861 52.454 31.6774 53.6018 31.6861 53.5956C36.3581 53.3622 40.8049 51.5171 44.2696 48.3742L43.4655 47.5701C43.3687 47.4735 43.2919 47.3587 43.2395 47.2324C43.1871 47.1061 43.1601 46.9706 43.1601 46.8339C43.1601 46.6971 43.1871 46.5617 43.2395 46.4353C43.2919 46.309 43.3687 46.1942 43.4655 46.0976C43.6627 45.902 43.9292 45.7922 44.2069 45.7922C44.4847 45.7922 44.7512 45.902 44.9484 46.0976L45.742 46.8913C48.8832 43.4255 50.728 38.9794 50.9634 34.3078H49.8251C49.5508 34.3039 49.2891 34.1921 49.0965 33.9967C48.9039 33.8013 48.7959 33.5379 48.7959 33.2636C48.7959 32.9892 48.9039 32.7259 49.0965 32.5305C49.2891 32.335 49.5508 32.2233 49.8251 32.2193H50.9634C50.8903 30.6299 50.6238 29.0554 50.1698 27.5305C51.063 27.4803 51.9484 27.3369 52.8118 27.1024C53.485 26.9171 54.1417 26.6761 54.775 26.3819ZM54.1067 24.3873C52.6518 25.1039 51.0501 25.4721 49.4283 25.4629H38.8185C38.606 25.4609 38.3991 25.3943 38.2253 25.272C38.0515 25.1497 37.9189 24.9774 37.8453 24.778C37.7717 24.5787 37.7604 24.3616 37.813 24.1557C37.8655 23.9497 37.9795 23.7647 38.1397 23.625L41.0114 21.1918C41.1259 21.1033 41.2048 20.9765 41.2336 20.8347C41.2624 20.6928 41.2392 20.5453 41.1683 20.4192C35.7065 10.6239 48.3142 0.716544 56.5711 8.3368C57.7317 9.43362 58.6088 10.7956 59.1272 12.306C59.6456 13.8163 59.7898 15.4299 59.5475 17.0082C59.3051 18.5866 58.6835 20.0826 57.7358 21.3678C56.7881 22.653 55.5428 23.6892 54.1067 24.3873ZM48.7495 15.0411V19.4793H47.6322C47.3552 19.4793 47.0896 19.5893 46.8937 19.7851C46.6979 19.981 46.5879 20.2466 46.5879 20.5235C46.5879 20.8005 46.6979 21.0661 46.8937 21.2619C47.0896 21.4578 47.3552 21.5678 47.6322 21.5678H51.9555C52.2324 21.5678 52.498 21.4578 52.6939 21.2619C52.8897 21.0661 52.9997 20.8005 52.9997 20.5235C52.9997 20.2466 52.8897 19.981 52.6939 19.7851C52.498 19.5893 52.2324 19.4793 51.9555 19.4793H50.8381V13.7985C50.8363 13.5561 50.771 13.3185 50.6487 13.1093C50.5264 12.9001 50.3514 12.7266 50.1411 12.6061C49.9308 12.4856 49.6927 12.4224 49.4503 12.4227C49.208 12.423 48.97 12.4869 48.76 12.6079L47.131 13.5686C46.8956 13.7106 46.7256 13.9394 46.6576 14.2058C46.5896 14.4721 46.6292 14.7545 46.7678 14.9918C46.9064 15.2292 47.1328 15.4025 47.3981 15.4742C47.6635 15.546 47.9464 15.5104 48.1857 15.3752L48.7495 15.0411ZM50.9529 10.1748C50.9483 9.87046 50.8241 9.58014 50.6072 9.36655C50.3904 9.15296 50.0982 9.03324 49.7938 9.03324C49.4894 9.03324 49.1972 9.15296 48.9804 9.36655C48.7635 9.58014 48.6393 9.87046 48.6347 10.1748C48.6393 10.4792 48.7635 10.7695 48.9804 10.9831C49.1972 11.1967 49.4894 11.3164 49.7938 11.3164C50.0982 11.3164 50.3904 11.1966 50.6073 10.983C50.8241 10.7695 50.9483 10.4792 50.9529 10.1748ZM24.7312 39.1804C24.8281 39.2774 24.9432 39.3544 25.0699 39.4069C25.1966 39.4593 25.3324 39.4864 25.4695 39.4864C25.6066 39.4864 25.7424 39.4593 25.8691 39.4069C25.9958 39.3544 26.1109 39.2774 26.2078 39.1804L29.2947 36.0936C29.6775 36.2718 30.0925 36.3707 30.5145 36.3843C30.9366 36.3979 31.357 36.3258 31.7505 36.1726C32.144 36.0193 32.5023 35.7879 32.804 35.4925C33.1056 35.197 33.3443 34.8434 33.5057 34.4532C33.6671 34.063 33.7478 33.6441 33.7429 33.2219C33.738 32.7996 33.6477 32.3828 33.4774 31.9963C33.3071 31.6099 33.0603 31.262 32.7519 30.9735C32.4436 30.6851 32.08 30.462 31.6831 30.3179L31.6831 21.2325C31.6792 20.9582 31.5674 20.6964 31.372 20.5038C31.1766 20.3113 30.9132 20.2033 30.6389 20.2033C30.3645 20.2033 30.1012 20.3113 29.9058 20.5038C29.7104 20.6964 29.5986 20.9582 29.5946 21.2325V30.3201C29.1829 30.4678 28.8066 30.7 28.4901 31.002C28.1736 31.3039 27.9238 31.6688 27.757 32.0731C27.5901 32.4774 27.5097 32.9123 27.5211 33.3495C27.5325 33.7868 27.6354 34.2169 27.8231 34.6119L24.7312 37.7038C24.6342 37.8008 24.5573 37.9158 24.5048 38.0425C24.4523 38.1692 24.4253 38.305 24.4253 38.4421C24.4253 38.5792 24.4523 38.715 24.5048 38.8417C24.5572 38.9684 24.6342 39.0835 24.7312 39.1804Z"
        fill="url(#paint0_linear_3939_49884)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3939_49884"
          x1="5.66672"
          y1="32.0001"
          x2="59.6667"
          y2="32.0001"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDE00" />
          <stop offset="1" stopColor="#FD5900" />
        </linearGradient>
      </defs>
    </svg>
  );
}
