import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export function PageTransition({ children }) {
    return (_jsx(motion.div, { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -24 }, transition: { duration: 0.22, ease: 'easeInOut' }, style: { flex: 1, minWidth: 0, width: '100%' }, children: children }));
}
