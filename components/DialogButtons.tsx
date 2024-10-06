interface DefaultDialogButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

export function DefaultDialogButton({
  text,
  onClick,
  className,
}: DefaultDialogButtonProps) {
  return (
    <div className={className + ' p-2 font-bold cursor-pointer'} onClick={onClick}>
      {text}
    </div>
  );
}

interface ConfirmDialogButtonProps {
  onClick: () => void;
}
export function ConfirmDialogButton({ onClick }: ConfirmDialogButtonProps) {
  return (
    <DefaultDialogButton
      text="확인"
      onClick={onClick}
      className="text-blue-400"
    />
  );
}

interface CancelDialogButtonProps {
  onClick: () => void;
}
export function CancelDialogButton({ onClick }: CancelDialogButtonProps) {
  return (
    <DefaultDialogButton
      text="취소"
      onClick={onClick}
      className="text-gray-500"
    />
  );
}
