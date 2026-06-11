import { z } from 'zod';
// ── Step 1: dane osobowe i hasło ──────────────────────────────────────────────
export const step1Schema = z
    .object({
    firstName: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki'),
    lastName: z.string().min(2, 'Nazwisko musi mieć co najmniej 2 znaki'),
    email: z.string().email('Podaj poprawny adres e-mail'),
    password: z
        .string()
        .min(8, 'Hasło musi mieć co najmniej 8 znaków')
        .regex(/[A-Z]/, 'Hasło musi zawierać wielką literę')
        .regex(/[0-9]/, 'Hasło musi zawierać cyfrę'),
    confirmPassword: z.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: 'Hasła muszą być identyczne',
    path: ['confirmPassword'],
});
// ── Step 2: kategorie i powiadomienia ─────────────────────────────────────────
export const step2Schema = z.object({
    categories: z
        .array(z.object({ value: z.string().min(1) }))
        .min(1, 'Wybierz co najmniej jedną kategorię'),
    notifications: z.object({
        email: z.boolean(),
        push: z.boolean(),
    }),
    newsletter: z.boolean().optional(),
});
// ── Step 3: zgody RODO ────────────────────────────────────────────────────────
export const step3Schema = z.object({
    gdpr: z.literal(true, 'Musisz zaakceptować politykę prywatności'),
});
