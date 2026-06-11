import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step3Schema } from '../../schemas/registrationSchemas';
import styles from './Step3.module.css';
export function Step3({ data, onBack, onSubmitError, onRegister, onSuccess }) {
    const { control, handleSubmit, setError, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(step3Schema),
        defaultValues: { gdpr: undefined },
    });
    async function onSubmit(_formData) {
        try {
            await onRegister?.({
                firstName: data.step1.firstName,
                lastName: data.step1.lastName,
                email: data.step1.email,
                password: data.step1.password,
            });
            onSuccess?.();
        }
        catch (err) {
            const status = err.status;
            if (status === 409) {
                onSubmitError('email', 'Ten adres e-mail jest już zajęty');
            }
            else {
                setError('root', { type: 'server', message: 'Błąd serwera, spróbuj ponownie' });
            }
        }
    }
    const { step1, step2 } = data;
    return (_jsxs("form", { className: styles.form, onSubmit: handleSubmit(onSubmit), noValidate: true, "aria-describedby": "required-hint", children: [_jsx("h2", { className: styles.heading, children: "Podsumowanie" }), _jsx("p", { id: "required-hint", className: styles.required, children: "Pola oznaczone * s\u0105 wymagane" }), _jsx("div", { role: "alert", "aria-live": "polite", className: styles.rootError, children: errors.root?.message }), _jsxs("section", { className: styles.summary, "aria-label": "Dane osobowe", children: [_jsx("h3", { className: styles.sectionTitle, children: "Dane osobowe" }), _jsxs("dl", { className: styles.dl, children: [_jsxs("div", { className: styles.dlRow, children: [_jsx("dt", { children: "Imi\u0119 i nazwisko" }), _jsxs("dd", { children: [step1.firstName, " ", step1.lastName] })] }), _jsxs("div", { className: styles.dlRow, children: [_jsx("dt", { children: "E-mail" }), _jsx("dd", { children: step1.email })] })] })] }), _jsxs("section", { className: styles.summary, "aria-label": "Preferencje", children: [_jsx("h3", { className: styles.sectionTitle, children: "Preferencje" }), _jsxs("dl", { className: styles.dl, children: [_jsxs("div", { className: styles.dlRow, children: [_jsx("dt", { children: "Kategorie" }), _jsx("dd", { children: step2.categories.map((c) => c.value).filter(Boolean).join(', ') || '—' })] }), _jsxs("div", { className: styles.dlRow, children: [_jsx("dt", { children: "Powiadomienia e-mail" }), _jsx("dd", { children: step2.notifications.email ? 'Tak' : 'Nie' })] }), _jsxs("div", { className: styles.dlRow, children: [_jsx("dt", { children: "Powiadomienia push" }), _jsx("dd", { children: step2.notifications.push ? 'Tak' : 'Nie' })] }), step2.newsletter !== undefined && (_jsxs("div", { className: styles.dlRow, children: [_jsx("dt", { children: "Newsletter" }), _jsx("dd", { children: step2.newsletter ? 'Tak' : 'Nie' })] }))] })] }), _jsxs("div", { className: styles.gdprField, children: [_jsx(Controller, { control: control, name: "gdpr", render: ({ field }) => (_jsx("input", { type: "checkbox", id: "gdpr", className: styles.checkbox, "aria-required": "true", "aria-invalid": !!errors.gdpr, "aria-describedby": errors.gdpr ? 'gdpr-err' : undefined, checked: field.value === true, onChange: (e) => field.onChange(e.target.checked || undefined) })) }), _jsxs("label", { htmlFor: "gdpr", children: ["Akceptuj\u0119", ' ', _jsx("button", { type: "button", className: styles.link, onClick: () => window.open('/polityka-prywatnosci', '_blank', 'noopener,noreferrer'), children: "polityk\u0119 prywatno\u015Bci" }), ' ', "i wyra\u017Cam zgod\u0119 na przetwarzanie danych osobowych *"] })] }), errors.gdpr && (_jsx("span", { id: "gdpr-err", className: styles.error, role: "alert", children: errors.gdpr.message })), _jsxs("div", { className: styles.actions, children: [_jsx("button", { type: "button", className: styles.btnBack, onClick: onBack, children: "Wstecz" }), _jsx("button", { type: "submit", className: styles.btnSubmit, disabled: isSubmitting, "aria-busy": isSubmitting, children: isSubmitting ? 'Wysyłanie…' : 'Zarejestruj się' })] })] }));
}
