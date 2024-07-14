interface Props {
  title: string;
  initialValue: string | number;
  suffix?: string;
}

export default function SlotDialogField({
  title,
  initialValue,
  suffix,
}: Props) {
  return (
    <div>
      <b className="mr-2">{title}</b>
      <span>
        {typeof initialValue === 'number'
          ? initialValue.toLocaleString()
          : initialValue}
        {suffix && <>{suffix}</>}
      </span>
    </div>
  );
}
