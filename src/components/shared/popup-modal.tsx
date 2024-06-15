import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import * as Icons from 'lucide-react'; // Importar todos los íconos
import { useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';

type TPopupModalProps = {
  onConfirm?: () => void;
  loading?: boolean;
  icon?: string;
  title?: string;
  disabled?: boolean;
  renderModal: (onClose: () => void) => React.ReactNode;
};
export default function PopupModal({
  renderModal,
  title,
  icon,
  disabled = false
}: TPopupModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const IconComponent = icon ? Icons[icon] : undefined;

  return (
    <>
      <Button
        className="ml-2 mr-2 text-xs md:text-sm"
        onClick={() => setIsOpen(true)}
        disabled={disabled}
      >
        {IconComponent ? <IconComponent className="h-4 w-4" /> : ''}
        {title && title}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className={'!bg-background !px-1'}
      >
        <ScrollArea className="h-[80dvh] px-6  ">
          {renderModal(onClose)}
        </ScrollArea>
      </Modal>
    </>
  );
}
