import { UiIcon } from './ui-icon';
import type { SurveyStep } from './types';

export function SurveyProgress({ steps, currentStep, onBack, variant = 'sidebar', skippedSteps = [], allowBack = true }: {
  steps: readonly SurveyStep[];
  currentStep: number;
  onBack: (index: number) => void;
  variant?: 'sidebar' | 'timeline';
  skippedSteps?: readonly number[];
  allowBack?: boolean;
}) {
  return <nav className={`nomination-progress${variant === 'timeline' ? ' survey-timeline survey-dot-timeline' : ''}`} aria-label="Tiến trình khảo sát">
    <p className={variant === 'timeline' ? 'sr-only' : 'type-label'}>Các bước</p>
    <ol>{steps.map((step, index) => <li key={step.id} data-state={index === currentStep ? 'current' : skippedSteps.includes(index) ? 'skipped' : index < currentStep ? 'complete' : 'upcoming'}>
      <button type="button" disabled={!allowBack || index >= currentStep || skippedSteps.includes(index)} aria-current={index === currentStep ? 'step' : undefined} onClick={() => onBack(index)}>
        <span className="nomination-step-number" aria-hidden="true">{skippedSteps.includes(index) ? '—' : index < currentStep ? <UiIcon name="check" size={16} /> : String(index + 1).padStart(2, '0')}</span>
        <span className="survey-step-copy"><span className="nomination-step-label">{step.title}</span>{variant === 'timeline' && step.description && <span className="survey-step-description">{step.description}</span>}</span>
        <span className="sr-only">{index === currentStep ? ' — Bước hiện tại' : skippedSteps.includes(index) ? ' — Đã bỏ qua' : index < currentStep ? ' — Đã qua' : ' — Chưa mở'}</span>
      </button>
    </li>)}</ol>
  </nav>;
}
