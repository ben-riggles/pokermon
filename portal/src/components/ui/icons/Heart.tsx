type Props = {
  bgColor?: string;
  fgColor?: string;
  height?: number;
  width?: number;
};

export default function Heart({
  bgColor = '#ff2233',
  fgColor = '#880000',
  height = 20,
  width = 20,
}: Props) {
  return (
    <div className='center-flex'>
      <svg
        height={height * 1.2}
        width={width * 1.2}
        className='absolute'
        xmlns='https://www.w3.org/2000/svg'
        viewBox='0 0 512 512'
      >
        <g transform='translate(0,0)'>
          <path
            d='M480.25 156.355c0 161.24-224.25 324.43-224.25 324.43S31.75 317.595 31.75 156.355c0-91.41 70.63-125.13 107.77-125.13 77.65 0 116.48 65.72 116.48 65.72s38.83-65.73 116.48-65.73c37.14.01 107.77 33.72 107.77 125.14z'
            fill={bgColor}
            fillOpacity='1'
          ></path>
        </g>
      </svg>
      <svg
        className='absolute'
        height={height}
        width={width}
        xmlns='https://www.w3.org/2000/svg'
        viewBox='0 0 512 512'
      >
        <g transform='translate(0,0)'>
          <path
            d='M480.25 156.355c0 161.24-224.25 324.43-224.25 324.43S31.75 317.595 31.75 156.355c0-91.41 70.63-125.13 107.77-125.13 77.65 0 116.48 65.72 116.48 65.72s38.83-65.73 116.48-65.73c37.14.01 107.77 33.72 107.77 125.14z'
            fill={fgColor}
            fillOpacity='1'
          ></path>
        </g>
      </svg>
    </div>
  );
}
