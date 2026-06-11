import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
const FOCUSABLE_SELECTORS = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    'details > summary',
].join(', ');
export function FocusTrap({ children, onEscape, triggerRef }) {
    const containerRef = useRef(null);
    useEffect(() => {
        const container = containerRef.current;
        if (!container)
            return;
        const getFocusable = () => Array.from(container.querySelectorAll(FOCUSABLE_SELECTORS))
            .filter(el => !el.closest('[aria-hidden="true"]'));
        getFocusable()[0]?.focus();
        function handleKeyDown(e) {
            const focusable = getFocusable();
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.key === 'Escape') {
                onEscape?.();
                triggerRef?.current?.focus();
                return;
            }
            if (e.key !== 'Tab')
                return;
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last?.focus();
                }
            }
            else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first?.focus();
                }
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            triggerRef?.current?.focus();
        };
    }, [onEscape, triggerRef]);
    return _jsx("div", { ref: containerRef, children: children });
}
