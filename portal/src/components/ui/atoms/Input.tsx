export default function Input({
  className,
  ...rest
}: React.ComponentProps<'input'>) {
  return (
    <div>
      <input className='' value={rest.value} onChange={() => 5} />
      <p></p>
    </div>
  );
}
