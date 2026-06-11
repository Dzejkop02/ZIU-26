import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step2Schema } from '../../schemas/registrationSchemas';
import styles from './Step2.module.css';
export function Step2({ onComplete, onBack, defaultValues }) {
    const { register, control, handleSubmit, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(step2Schema),
        mode: 'onBlur',
        defaultValues: {
            categories: [{ value: '' }],
            notifications: { email: false, push: false },
            newsletter: false,
            ...defaultValues,
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'categories',
        rules: { minLength: { value: 1, message: 'Wybierz co najmniej jedną kategorię' } },
    });
    return (_jsxs("form", { className: styles.form, onSubmit: handleSubmit(onComplete), noValidate: true, "aria-describedby": "required-hint", children: [_jsx("h2", { className: styles.heading, children: "Preferencje" }), _jsx("p", { id: "required-hint", className: styles.required, children: "Pola oznaczone * s\u0105 wymagane" }), _jsx("div", { role: "alert", "aria-live": "polite", className: styles.rootError, children: errors.root?.message }), _jsxs("fieldset", { className: styles.fieldset, children: [_jsx("legend", { className: styles.legend, children: "Kategorie *" }), _jsx("ul", { className: styles.categoryList, children: fields.map((field, index) => (_jsxs("li", { className: styles.categoryItem, children: [_jsx("input", { className: styles.categoryInput, type: "text", "aria-label": `Kategoria ${index + 1}`, "aria-invalid": !!errors.categories?.[index]?.value, ...register(`categories.${index}.value`) }), _jsx("button", { type: "button", className: styles.btnRemove, onClick: () => remove(index), "aria-label": `Usuń kategorię ${index + 1}`, disabled: fields.length === 1, children: "Usu\u0144" })] }, field.id))) }), _jsx("button", { type: "button", className: styles.btnAdd, onClick: () => append({ value: '' }), children: "+ Dodaj kategori\u0119" }), (errors.categories?.root?.message || errors.categories?.message) && (_jsx("span", { className: styles.error, role: "alert", children: errors.categories?.root?.message ?? errors.categories?.message }))] }), _jsxs("fieldset", { className: styles.fieldset, children: [_jsx("legend", { className: styles.legend, children: "Powiadomienia" }), _jsxs("div", { className: styles.checkboxField, children: [_jsx(Controller, { control: control, name: "notifications.email", render: ({ field }) => (_jsx("input", { type: "checkbox", id: "notif-email", "aria-label": "Powiadomienia e-mail", checked: field.value, onChange: field.onChange, className: styles.checkbox })) }), _jsx("label", { htmlFor: "notif-email", children: "Powiadomienia e-mail" })] }), _jsxs("div", { className: styles.checkboxField, children: [_jsx(Controller, { control: control, name: "notifications.push", render: ({ field }) => (_jsx("input", { type: "checkbox", id: "notif-push", "aria-label": "Powiadomienia push", checked: field.value, onChange: field.onChange, className: styles.checkbox })) }), _jsx("label", { htmlFor: "notif-push", children: "Powiadomienia push" })] })] }), _jsxs("div", { className: styles.checkboxField, children: [_jsx(Controller, { control: control, name: "newsletter", render: ({ field }) => (_jsx("input", { type: "checkbox", id: "newsletter", "aria-label": "Zapisz do newslettera", checked: field.value ?? false, onChange: field.onChange, className: styles.checkbox })) }), _jsx("label", { htmlFor: "newsletter", children: "Zapisz mnie do newslettera (opcjonalne)" })] }), _jsxs("div", { className: styles.actions, children: [_jsx("button", { type: "button", className: styles.btnBack, onClick: onBack, children: "Wstecz" }), _jsx("button", { type: "submit", className: styles.btnSubmit, disabled: isSubmitting, "aria-busy": isSubmitting, children: isSubmitting ? 'Wysyłanie…' : 'Dalej' })] })] }));
}
