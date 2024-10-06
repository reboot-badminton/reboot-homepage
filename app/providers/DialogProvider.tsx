'use client';

import CircularProgressIndicator from '@/components/CircularProgressIndicator';
import { CancelDialogButton, ConfirmDialogButton } from '@/components/DialogButtons';
import { createContext, PropsWithChildren, ReactNode, useCallback, useContext, useState } from 'react';

interface Dialog {
  title?: string;
  body?: ReactNode | string;
  // Close the dialog if true is returned. Dialog stays open otherwise.
  onConfirm?: () => boolean | Promise<boolean>;
  // Close the dialog if true is returned. Dialog stays open otherwise.
  onCancel?: () => boolean | Promise<boolean>;
}

interface DialogContextType {
  showDialog: (dialog: Dialog) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType>({
  showDialog: () => { },
  closeDialog: () => { },
});

export function useDialog() {
  const context = useContext(DialogContext);
  if (context == null) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
}

export function DialogProvider({ children }: PropsWithChildren) {
  const [dialog, setDialog] = useState<Dialog>({
    title: '정말로 하시겠습니까?',
    body: <CircularProgressIndicator text="로딩 중입니다" />,
    onCancel: () => true,
    onConfirm: () => true,
  });
  const [isShown, setIsShown] = useState(false);

  const showDialog = useCallback((dialog: Dialog) => {
    setDialog(dialog);
    setIsShown(true);
  }, [setDialog, setIsShown]);

  const closeDialog = useCallback(() => {
    setIsShown(false);
  }, [setIsShown]);

  return (
    <DialogContext.Provider value={{ showDialog, closeDialog }}>
      <div className='relative'>
        {children}
        {isShown &&
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg pt-6 px-6 pb-3">
              {dialog.title && <h1 className="text-lg font-bold pb-3">{dialog.title}</h1>}
              {dialog.body}
              <div className="flex justify-end mt-3">
                {dialog.onCancel && <>
                  <CancelDialogButton onClick={() => {
                    if (dialog.onCancel!()) {
                      closeDialog();
                    }
                  }} />
                </>}
                {dialog.onConfirm && <>
                  <ConfirmDialogButton onClick={() => {
                    if (dialog.onConfirm!()) {
                      closeDialog();
                    }
                  }} />
                </>}
              </div>
            </div>
          </div>
        }
      </div>
    </DialogContext.Provider>
  );
}
