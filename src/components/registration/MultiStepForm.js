import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import styles from './MultiStepForm.module.css';
const STEP_TITLES = {
    1: 'Dane osobowe',
    2: 'Preferencje',
    3: 'Podsumowanie',
};
export function MultiStepForm({ onRegister, onSuccess }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [step1ServerError, setStep1ServerError] = useState(undefined);
    const [rootError, setRootError] = useState(null);
    const headingRef = useRef(null);
    // Przenieś fokus na nagłówek przy każdej zmianie kroku (dostępność)
    useEffect(() => {
        headingRef.current?.focus();
    }, [currentStep]);
    function handleStep1Complete(data) {
        setFormData((prev) => ({ ...prev, step1: data }));
        setStep1ServerError(undefined);
        setRootError(null);
        setCurrentStep(2);
    }
    function handleStep2Complete(data) {
        setFormData((prev) => ({ ...prev, step2: data }));
        setRootError(null);
        setCurrentStep(3);
    }
    function handleBack() {
        setCurrentStep((prev) => (prev - 1));
    }
    function handleSubmitError(field, message) {
        if (field === 'email') {
            setStep1ServerError({ field: 'email', message });
            setRootError(null);
            setCurrentStep(1);
        }
        else {
            setRootError(message);
        }
    }
    return (_jsxs("div", { className: styles.wrapper, children: [_jsx("nav", { "aria-label": "Post\u0119p rejestracji", className: styles.breadcrumb, children: _jsx("ol", { className: styles.breadcrumbList, children: [1, 2, 3].map((step) => (_jsxs("li", { className: `${styles.breadcrumbItem} ${currentStep === step ? styles['breadcrumbItem--active'] : ''} ${currentStep > step ? styles['breadcrumbItem--done'] : ''}`, "aria-current": currentStep === step ? 'step' : undefined, children: [_jsx("span", { className: styles.breadcrumbDot, children: currentStep > step ? '✓' : step }), _jsx("span", { className: styles.breadcrumbLabel, children: STEP_TITLES[step] })] }, step))) }) }), _jsxs("h2", { ref: headingRef, tabIndex: -1, className: styles.stepHeading, children: ["Krok ", currentStep, " z 3 \u2014 ", STEP_TITLES[currentStep]] }), rootError && (_jsx("div", { role: "alert", className: styles.rootError, children: rootError })), currentStep === 1 && (_jsx(Step1, { onComplete: handleStep1Complete, defaultValues: formData.step1, serverError: step1ServerError })), currentStep === 2 && (_jsx(Step2, { onComplete: handleStep2Complete, onBack: handleBack, defaultValues: formData.step2 })), currentStep === 3 && formData.step1 && formData.step2 && (_jsx(Step3, { data: { step1: formData.step1, step2: formData.step2 }, onBack: handleBack, onSubmitError: handleSubmitError, onRegister: onRegister, onSuccess: onSuccess }))] }));
}
