import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />,
          error: <AlertCircle size={18} className="text-rose-500 shrink-0" />,
          info: <Info size={18} className="text-sky-500 shrink-0" />
        };

        const bg = {
          success: 'bg-white border-emerald-200 text-slate-800 shadow-lg',
          error: 'bg-white border-rose-200 text-slate-800 shadow-lg',
          info: 'bg-white border-sky-200 text-slate-800 shadow-lg'
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-lg border text-xs shadow-md transition-all animate-in slide-in-from-bottom-2 ${bg[toast.type]}`}
          >
            <div className="flex items-center gap-2.5">
              {icons[toast.type]}
              <span className="font-medium">{toast.message}</span>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
