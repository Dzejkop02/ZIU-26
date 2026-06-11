import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema } from '../../schemas/registrationSchemas';
import styles from './Step1.module.css';
function getPasswordStrength(pwd) {
    if (!pwd)
        return 'słabe';
    let score = 0;
    if (pwd.length >= 12)
        score++;
    if (/[A-Z]/.test(pwd))
        score++;
    if (/[0-9]/.test(pwd))
        score++;
    if (/[^A-Za-z0-9]/.test(pwd))
        score++;
    if (score <= 1)
        return 'słabe';
    if (score <= 2)
        return 'średnie';
    return 'silne';
}
const strengthColor = {
    słabe: '#B71C1C',
    średnie: '#ea580c',
    silne: '#16a34a',
};
export function Step1({ onComplete, defaultValues, serverError }) {
    const { register, handleSubmit, control, setError, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(step1Schema),
        mode: 'onBlur',
        reValidateMode: 'onChange',
        defaultValues,
    });
    // Przekaż błąd serwera (np. 409 – e-mail zajęty) do pola formularza
    useEffect(() => {
        if (serverError) {
            setError(serverError.field, { message: serverError.message });
        }
    }, [serverError, setError]);
    const passwordValue = useWatch({ control, name: 'password' }) ?? '';
    const strength = getPasswordStrength(passwordValue);
    return (_jsxs("form", { className: styles.form, onSubmit: handleSubmit(onComplete), noValidate: true, "aria-describedby": "required-hint", children: [_jsx("h2", { className: styles.heading, children: "Dane osobowe" }), _jsx("p", { id: "required-hint", className: styles.required, children: "Pola oznaczone * s\u0105 wymagane" }), _jsx("div", { role: "alert", "aria-live": "polite", className: styles.rootError, children: errors.root?.message }), _jsxs("div", { className: styles.field, children: [_jsx("label", { htmlFor: "firstName", children: "Imi\u0119 *" }), _jsx("input", { id: "firstName", type: "text", "aria-required": "true", "aria-invalid": !!errors.firstName, "aria-describedby": errors.firstName ? 'firstName-err' : undefined, ...register('firstName') }), errors.firstName && (_jsx("span", { id: "firstName-err", className: styles.error, role: "alert", children: errors.firstName.message }))] }), _jsxs("div", { className: styles.field, children: [_jsx("label", { htmlFor: "lastName", children: "Nazwisko *" }), _jsx("input", { id: "lastName", type: "text", "aria-required": "true", "aria-invalid": !!errors.lastName, "aria-describedby": errors.lastName ? 'lastName-err' : undefined, ...register('lastName') }), errors.lastName && (_jsx("span", { id: "lastName-err", className: styles.error, role: "alert", children: errors.lastName.message }))] }), _jsxs("div", { className: styles.field, children: [_jsx("label", { htmlFor: "email", children: "E-mail *" }), _jsx("input", { id: "email", type: "email", autoComplete: "email", "aria-required": "true", "aria-invalid": !!errors.email, "aria-describedby": errors.email ? 'email-err' : undefined, ...register('email') }), errors.email && (_jsx("span", { id: "email-err", className: styles.error, role: "alert", children: errors.email.message }))] }), _jsxs("div", { className: styles.field, children: [_jsx("label", { htmlFor: "password", children: "Has\u0142o *" }), _jsx("input", { id: "password", type: "password", autoComplete: "new-password", "aria-required": "true", "aria-invalid": !!errors.password, "aria-describedby": errors.password ? 'password-err' : 'pwd-hint', ...register('password') }), errors.password ? (_jsx("span", { id: "password-err", className: styles.error, role: "alert", children: errors.password.message })) : (_jsx("span", { id: "pwd-hint", className: styles.hint, "aria-live": "polite", style: {
                            color: passwordValue ? strengthColor[strength] : undefined,
                        }, children: passwordValue
                            ? `Siła hasła: ${strength}`
                            : 'Min. 8 znaków, wielka litera i cyfra' }))] }), _jsxs("div", { className: styles.field, children: [_jsx("label", { htmlFor: "confirmPassword", children: "Powt\u00F3rz has\u0142o *" }), _jsx("input", { id: "confirmPassword", type: "password", autoComplete: "new-password", "aria-required": "true", "aria-invalid": !!errors.confirmPassword, "aria-describedby": errors.confirmPassword ? 'confirmPassword-err' : undefined, ...register('confirmPassword') }), errors.confirmPassword && (_jsx("span", { id: "confirmPassword-err", className: styles.error, role: "alert", children: errors.confirmPassword.message }))] }), _jsx("button", { type: "submit", className: styles.submit, disabled: isSubmitting, "aria-busy": isSubmitting, children: isSubmitting ? 'Wysyłanie…' : 'Dalej' })] }));
}
