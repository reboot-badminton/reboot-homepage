'use client';

import Dialog from '@/app/components/Dialog';

interface Props {
  text: string;
  onConfirm: () => void;
}

function RegistrationDecisionDialog({ text, onConfirm }: Props) {
  return (
    <Dialog>
      <div className="p-4 flex flex-col gap-4 items-center justify-around">
        <p>{text}</p>
        <div onClick={onConfirm} className="cursor-pointer hover:text-blue-300">
          확인
        </div>
      </div>
    </Dialog>
  );
}

export default RegistrationDecisionDialog;
