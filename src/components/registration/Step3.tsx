import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step3Schema } from '../../schemas/registrationSchemas';
import type { Step3Data, Step1Data, Step2Data } from '../../schemas/registrationSchemas';
import styles from './Step3.module.css';

interface Step3Props {
  data: { step1: Step1Data; step2: Step2Data };
  onBack: () => void;
  onSubmitError: (field: 'email' | 'root', message: string) => void;
  onRegister?: (data: { firstName: string; lastName: string; email: string; password: string }) => Promise<void> | void;
  onSuccess?: () => void;
}

export function Step3({ data, onBack, onSubmitError, onRegister, onSuccess }: Step3Props) {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: { gdpr: undefined },
  });

  async function onSubmit(_formData: Step3Data) {
    try {
      await onRegister?.({
        firstName: data.step1.firstName,
        lastName: data.step1.lastName,
        email: data.step1.email,
        password: data.step1.password,
      });
      onSuccess?.();
    } catch (err) {
      const status = (err as { status?: number }).status;
      if (status === 409) {
        onSubmitError('email', 'Ten adres e-mail jest już zajęty');
      } else {
        setError('root', { type: 'server', message: 'Błąd serwera, spróbuj ponownie' });
      }
    }
  }

  const { step1, step2 } = data;

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate aria-describedby="required-hint">
      <h2 className={styles.heading}>Podsumowanie</h2>

      <p id="required-hint" className={styles.required}>Pola oznaczone * są wymagane</p>

      {/* Błąd serwera na poziomie formularza (root) */}
      <div role="alert" aria-live="polite" className={styles.rootError}>
        {errors.root?.message}
      </div>

      {/* ── Dane osobowe (read-only) ── */}
      <section className={styles.summary} aria-label="Dane osobowe">
        <h3 className={styles.sectionTitle}>Dane osobowe</h3>
        <dl className={styles.dl}>
          <div className={styles.dlRow}>
            <dt>Imię i nazwisko</dt>
            <dd>{step1.firstName} {step1.lastName}</dd>
          </div>
          <div className={styles.dlRow}>
            <dt>E-mail</dt>
            <dd>{step1.email}</dd>
          </div>
        </dl>
      </section>

      {/* ── Preferencje (read-only) ── */}
      <section className={styles.summary} aria-label="Preferencje">
        <h3 className={styles.sectionTitle}>Preferencje</h3>
        <dl className={styles.dl}>
          <div className={styles.dlRow}>
            <dt>Kategorie</dt>
            <dd>{step2.categories.map((c) => c.value).filter(Boolean).join(', ') || '—'}</dd>
          </div>
          <div className={styles.dlRow}>
            <dt>Powiadomienia e-mail</dt>
            <dd>{step2.notifications.email ? 'Tak' : 'Nie'}</dd>
          </div>
          <div className={styles.dlRow}>
            <dt>Powiadomienia push</dt>
            <dd>{step2.notifications.push ? 'Tak' : 'Nie'}</dd>
          </div>
          {step2.newsletter !== undefined && (
            <div className={styles.dlRow}>
              <dt>Newsletter</dt>
              <dd>{step2.newsletter ? 'Tak' : 'Nie'}</dd>
            </div>
          )}
        </dl>
      </section>

      {/* ── Zgoda RODO ── */}
      <div className={styles.gdprField}>
        <Controller
          control={control}
          name="gdpr"
          render={({ field }) => (
            <input
              type="checkbox"
              id="gdpr"
              className={styles.checkbox}
              aria-required="true"
              aria-invalid={!!errors.gdpr}
              aria-describedby={errors.gdpr ? 'gdpr-err' : undefined}
              checked={field.value === true}
              onChange={(e) => field.onChange(e.target.checked || undefined)}
            />
          )}
        />
        <label htmlFor="gdpr">
          Akceptuję{' '}
          <button
            type="button"
            className={styles.link}
            onClick={() => window.open('/polityka-prywatnosci', '_blank', 'noopener,noreferrer')}
          >
            politykę prywatności
          </button>{' '}
          i wyrażam zgodę na przetwarzanie danych osobowych *
        </label>
      </div>
      {errors.gdpr && (
        <span id="gdpr-err" className={styles.error} role="alert">
          {errors.gdpr.message}
        </span>
      )}

      {/* ── Przyciski nawigacji ── */}
      <div className={styles.actions}>
        <button type="button" className={styles.btnBack} onClick={onBack}>
          Wstecz
        </button>
        <button
          type="submit"
          className={styles.btnSubmit}
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Wysyłanie…' : 'Zarejestruj się'}
        </button>
      </div>
    </form>
  );
}
