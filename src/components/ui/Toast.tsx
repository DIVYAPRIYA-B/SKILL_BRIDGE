import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function ToastContainer() {
  const { toasts, dismissToast } = useApp();
  if (!toasts.length) return null;
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => {
        const Icon = t.type === 'success' ? CheckCircle2 : t.type === 'error' ? XCircle : Info;
        const color = t.type === 'success' ? 'text-teal-600' : t.type === 'error' ? 'text-rose-600' : 'text-brand-600';
        return (
          <div key={t.id} className="pointer-events-auto flex items-start gap-3 bg-white rounded-xl border border-ink-100 shadow-float p-3.5 animate-slide-in-right">
            <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${color}`} />
            <p className="text-sm text-ink-800 flex-1">{t.message}</p>
            <button onClick={() => dismissToast(t.id)} className="text-ink-400 hover:text-ink-600 shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
