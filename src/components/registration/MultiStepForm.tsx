import { useState, useRef, useEffect } from 'react';
import type { Step1Data, Step2Data } from '../../schemas/registrationSchemas';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import styles from './MultiStepForm.module.css';

type CurrentStep = 1 | 2 | 3;

const STEP_TITLES: Record<CurrentStep, string> = {
  1: 'Dane osobowe',
  2: 'Preferencje',
  3: 'Podsumowanie',
};

interface MultiStepFormProps {
  onRegister?: (data: { firstName: string; lastName: string; email: string; password: string }) => Promise<void> | void;
  onSuccess?: () => void;
}

export function MultiStepForm({ onRegister, onSuccess }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState<CurrentStep>(1);
  const [formData, setFormData] = useState<{ step1?: Step1Data; step2?: Step2Data }>({});
  const [step1ServerError, setStep1ServerError] = useState<
    { field: keyof Step1Data; message: string } | undefined
  >(undefined);
  const [rootError, setRootError] = useState<string | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);

  // Przenieś fokus na nagłówek przy każdej zmianie kroku (dostępność)
  useEffect(() => {
    headingRef.current?.focus();
  }, [currentStep]);

  function handleStep1Complete(data: Step1Data) {
    setFormData((prev) => ({ ...prev, step1: data }));
    setStep1ServerError(undefined);
    setRootError(null);
    setCurrentStep(2);
  }

  function handleStep2Complete(data: Step2Data) {
    setFormData((prev) => ({ ...prev, step2: data }));
    setRootError(null);
    setCurrentStep(3);
  }

  function handleBack() {
    setCurrentStep((prev) => (prev - 1) as CurrentStep);
  }

  function handleSubmitError(field: 'email' | 'root', message: string) {
    if (field === 'email') {
      setStep1ServerError({ field: 'email', message });
      setRootError(null);
      setCurrentStep(1);
    } else {
      setRootError(message);
    }
  }

  return (
    <div className={styles.wrapper}>
      {/* ── Breadcrumb nawigacja ── */}
      <nav aria-label="Postęp rejestracji" className={styles.breadcrumb}>
        <ol className={styles.breadcrumbList}>
          {([1, 2, 3] as CurrentStep[]).map((step) => (
            <li
              key={step}
              className={`${styles.breadcrumbItem} ${currentStep === step ? styles['breadcrumbItem--active'] : ''} ${currentStep > step ? styles['breadcrumbItem--done'] : ''}`}
              aria-current={currentStep === step ? 'step' : undefined}
            >
              <span className={styles.breadcrumbDot}>{currentStep > step ? '✓' : step}</span>
              <span className={styles.breadcrumbLabel}>{STEP_TITLES[step]}</span>
            </li>
          ))}
        </ol>
      </nav>

      {/* ── Nagłówek z focusem (zarządzanie fokusem przy zmianie kroku) ── */}
      <h2
        ref={headingRef}
        tabIndex={-1}
        className={styles.stepHeading}
      >
        Krok {currentStep} z 3 — {STEP_TITLES[currentStep]}
      </h2>

      {rootError && (
        <div role="alert" className={styles.rootError}>
          {rootError}
        </div>
      )}

      {/* ── Warunkowy render kroków ── */}
      {currentStep === 1 && (
        <Step1
          onComplete={handleStep1Complete}
          defaultValues={formData.step1}
          serverError={step1ServerError}
        />
      )}

      {currentStep === 2 && (
        <Step2
          onComplete={handleStep2Complete}
          onBack={handleBack}
          defaultValues={formData.step2}
        />
      )}

      {currentStep === 3 && formData.step1 && formData.step2 && (
        <Step3
          data={{ step1: formData.step1, step2: formData.step2 }}
          onBack={handleBack}
          onSubmitError={handleSubmitError}
          onRegister={onRegister}
          onSuccess={onSuccess}
        />
      )}
    </div>
  );
}
