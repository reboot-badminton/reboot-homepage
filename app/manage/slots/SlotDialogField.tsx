interface Props {
  title: string;
  initialValue: string | number;
  suffix?: string;
  isEditMode: boolean;
}

export default function SlotDialogField({
  title,
  initialValue,
  suffix,
  isEditMode,
}: Props) {

  return (
    <div className='flex whitespace-nowrap'>
      <b className="mr-2">{title}</b>
      {!isEditMode && (
        <span className='flex-grow border-b border-transparent'>
          {typeof initialValue === 'number'
            ? initialValue.toLocaleString()
            : initialValue}
          {suffix && <>{suffix}</>}
        </span>
      )}
      {isEditMode && <input className='flex-grow border-b' size={10} />}
    </div>
  );
}
