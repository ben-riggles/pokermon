type Props = {
  value: string;
  handleFn: (v: string) => void;
  placeholder: string;
  label: string;
  err?: string;
};
export default function FormInput({
  value,
  handleFn,
  placeholder,
  label,
  err,
}: Props) {
  return (
    <div className='flex flex-col w-52'>
      <label>{label}</label>
      <input
        className={`pl-2 pixel-border ${err && 'bg-red-100'}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleFn(e.target.value)}
      />
    </div>
  );
}
