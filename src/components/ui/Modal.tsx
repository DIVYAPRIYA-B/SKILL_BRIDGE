import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (open) {
      const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
      window.addEventListener('keydown', handler);
      document.body.style.overflow = 'hidden';
      return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
    }
  }, [open, onClose]);

  if (!open) return null;
  const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${sizes[size]} bg-white rounded-2xl shadow-float max-h-[90vh] overflow-hidden flex flex-col animate-scale-in`}>
        {title && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-ink-100">
            <h3 className="text-lg font-semibold text-ink-900">{title}</h3>
            <button onClick={onClose} className="text-ink-400 hover:text-ink-600 p-1 rounded-lg hover:bg-ink-100">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="overflow-y-auto scrollbar-thin p-5">{children}</div>
      </div>
    </div>
  );
}
