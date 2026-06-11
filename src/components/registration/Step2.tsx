import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step2Schema } from '../../schemas/registrationSchemas';
import type { Step2Data } from '../../schemas/registrationSchemas';
import styles from './Step2.module.css';

interface Step2Props {
  onComplete: (data: Step2Data) => void;
  onBack: () => void;
  defaultValues?: Partial<Step2Data>;
}

export function Step2({ onComplete, onBack, defaultValues }: Step2Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step2Data>({
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

  return (
    <form className={styles.form} onSubmit={handleSubmit(onComplete)} noValidate aria-describedby="required-hint">
      <h2 className={styles.heading}>Preferencje</h2>

      <p id="required-hint" className={styles.required}>Pola oznaczone * są wymagane</p>

      {/* Błąd serwera na poziomie formularza (root) */}
      <div role="alert" aria-live="polite" className={styles.rootError}>
        {errors.root?.message}
      </div>

      {/* ── Dynamiczne kategorie ── */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Kategorie *</legend>

        <ul className={styles.categoryList}>
          {fields.map((field, index) => (
            <li key={field.id} className={styles.categoryItem}>
              <input
                className={styles.categoryInput}
                type="text"
                aria-label={`Kategoria ${index + 1}`}
                aria-invalid={!!errors.categories?.[index]?.value}
                {...register(`categories.${index}.value`)}
              />
              <button
                type="button"
                className={styles.btnRemove}
                onClick={() => remove(index)}
                aria-label={`Usuń kategorię ${index + 1}`}
                disabled={fields.length === 1}
              >
                Usuń
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={styles.btnAdd}
          onClick={() => append({ value: '' })}
        >
          + Dodaj kategorię
        </button>

        {(errors.categories?.root?.message || errors.categories?.message) && (
          <span className={styles.error} role="alert">
            {errors.categories?.root?.message ?? errors.categories?.message}
          </span>
        )}
      </fieldset>

      {/* ── Powiadomienia ── */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Powiadomienia</legend>

        <div className={styles.checkboxField}>
          <Controller
            control={control}
            name="notifications.email"
            render={({ field }) => (
              <input
                type="checkbox"
                id="notif-email"
                aria-label="Powiadomienia e-mail"
                checked={field.value}
                onChange={field.onChange}
                className={styles.checkbox}
              />
            )}
          />
          <label htmlFor="notif-email">Powiadomienia e-mail</label>
        </div>

        <div className={styles.checkboxField}>
          <Controller
            control={control}
            name="notifications.push"
            render={({ field }) => (
              <input
                type="checkbox"
                id="notif-push"
                aria-label="Powiadomienia push"
                checked={field.value}
                onChange={field.onChange}
                className={styles.checkbox}
              />
            )}
          />
          <label htmlFor="notif-push">Powiadomienia push</label>
        </div>
      </fieldset>

      {/* ── Newsletter (opcjonalne) ── */}
      <div className={styles.checkboxField}>
        <Controller
          control={control}
          name="newsletter"
          render={({ field }) => (
            <input
              type="checkbox"
              id="newsletter"
              aria-label="Zapisz do newslettera"
              checked={field.value ?? false}
              onChange={field.onChange}
              className={styles.checkbox}
            />
          )}
        />
        <label htmlFor="newsletter">Zapisz mnie do newslettera (opcjonalne)</label>
      </div>

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
          {isSubmitting ? 'Wysyłanie…' : 'Dalej'}
        </button>
      </div>
    </form>
  );
}
