import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema } from '../../schemas/registrationSchemas';
import type { Step1Data } from '../../schemas/registrationSchemas';
import styles from './Step1.module.css';

interface Step1Props {
  onComplete: (data: Step1Data) => void;
  defaultValues?: Partial<Step1Data>;
  /** Błąd serwera przekazany z MultiStepForm (np. 409 – e-mail zajęty) */
  serverError?: { field: keyof Step1Data; message: string };
}

type PasswordStrength = 'słabe' | 'średnie' | 'silne';

function getPasswordStrength(pwd: string): PasswordStrength {
  if (!pwd) return 'słabe';
  let score = 0;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 1) return 'słabe';
  if (score <= 2) return 'średnie';
  return 'silne';
}

const strengthColor: Record<PasswordStrength, string> = {
  słabe: '#B71C1C',
  średnie: '#ea580c',
  silne: '#16a34a',
};

export function Step1({ onComplete, defaultValues, serverError }: Step1Props) {
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Step1Data>({
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

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onComplete)}
      noValidate
      aria-describedby="required-hint"
    >
      <h2 className={styles.heading}>Dane osobowe</h2>

      <p id="required-hint" className={styles.required}>Pola oznaczone * są wymagane</p>

      {/* Błąd serwera na poziomie formularza (root) */}
      <div role="alert" aria-live="polite" className={styles.rootError}>
        {errors.root?.message}
      </div>

      {/* firstName */}
      <div className={styles.field}>
        <label htmlFor="firstName">Imię *</label>
        <input
          id="firstName"
          type="text"
          aria-required="true"
          aria-invalid={!!errors.firstName}
          aria-describedby={errors.firstName ? 'firstName-err' : undefined}
          {...register('firstName')}
        />
        {errors.firstName && (
          <span id="firstName-err" className={styles.error} role="alert">
            {errors.firstName.message}
          </span>
        )}
      </div>

      {/* lastName */}
      <div className={styles.field}>
        <label htmlFor="lastName">Nazwisko *</label>
        <input
          id="lastName"
          type="text"
          aria-required="true"
          aria-invalid={!!errors.lastName}
          aria-describedby={errors.lastName ? 'lastName-err' : undefined}
          {...register('lastName')}
        />
        {errors.lastName && (
          <span id="lastName-err" className={styles.error} role="alert">
            {errors.lastName.message}
          </span>
        )}
      </div>

      {/* email */}
      <div className={styles.field}>
        <label htmlFor="email">E-mail *</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-err' : undefined}
          {...register('email')}
        />
        {errors.email && (
          <span id="email-err" className={styles.error} role="alert">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* password */}
      <div className={styles.field}>
        <label htmlFor="password">Hasło *</label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          aria-required="true"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-err' : 'pwd-hint'}
          {...register('password')}
        />
        {errors.password ? (
          <span id="password-err" className={styles.error} role="alert">
            {errors.password.message}
          </span>
        ) : (
          <span
            id="pwd-hint"
            className={styles.hint}
            aria-live="polite"
            style={{
              color: passwordValue ? strengthColor[strength] : undefined,
            }}
          >
            {passwordValue
              ? `Siła hasła: ${strength}`
              : 'Min. 8 znaków, wielka litera i cyfra'}
          </span>
        )}
      </div>

      {/* confirmPassword */}
      <div className={styles.field}>
        <label htmlFor="confirmPassword">Powtórz hasło *</label>
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          aria-required="true"
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={
            errors.confirmPassword ? 'confirmPassword-err' : undefined
          }
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <span id="confirmPassword-err" className={styles.error} role="alert">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className={styles.submit}
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? 'Wysyłanie…' : 'Dalej'}
      </button>
    </form>
  );
}
