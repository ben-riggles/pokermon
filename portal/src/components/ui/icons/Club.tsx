type Props = {
  bgColor?: string;
  fgColor?: string;
  height?: number;
  width?: number;
};

export default function Club({
  bgColor = '#2233ff',
  fgColor = '#000055',
  height = 20,
  width = 20,
}: Props) {
  return (
    <div className='center-flex'>
      <svg
        height={height * 1.2}
        width={width * 1.2}
        className='absolute'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 512 512'
      >
        <g transform='translate(0,0)'>
          <path
            d='M477.443 295.143a104.45 104.45 0 0 1-202.26 36.67c-.08 68.73 4.33 114.46 69.55 149h-177.57c65.22-34.53 69.63-80.25 69.55-149a104.41 104.41 0 1 1-66.34-136.28 104.45 104.45 0 1 1 171.14 0 104.5 104.5 0 0 1 135.93 99.61z'
            fill={bgColor}
            fillOpacity='1'
          ></path>
        </g>
      </svg>
      <svg
        className='absolute'
        height={height}
        width={width}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 512 512'
      >
        <g transform='translate(0,0)'>
          <path
            d='M477.443 295.143a104.45 104.45 0 0 1-202.26 36.67c-.08 68.73 4.33 114.46 69.55 149h-177.57c65.22-34.53 69.63-80.25 69.55-149a104.41 104.41 0 1 1-66.34-136.28 104.45 104.45 0 1 1 171.14 0 104.5 104.5 0 0 1 135.93 99.61z'
            fill={fgColor}
            fillOpacity='1'
          ></path>
        </g>
      </svg>
    </div>
  );
}
