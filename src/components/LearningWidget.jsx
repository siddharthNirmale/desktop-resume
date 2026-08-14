import { Target } from 'lucide-react';
import WidgetCover from './WidgetCover';

export default function LearningWidget({
  constraintsRef,
  zIndex,
  onFocus,
  onClose,
  positionStyle,
  progress = 55,
  topic = "Frontend Optimization",
  subtopic = "Next.js App Router",
}) {
  const segments = 8;
  const filledCount = Math.round((progress / 100) * segments);

  return (
    <WidgetCover
      id="learning"
      title="Focus"
      zIndex={zIndex}
      onClose={onClose}
      onFocus={onFocus}
      constraintsRef={constraintsRef}
      positionStyle={positionStyle || { top: "214px", right: "20px" }}
    >
      <div className="flex flex-col gap-4 w-full">
        {/* Subject Row */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-[38px] w-[38px] rounded-[12px] bg-[var(--color-surface-inactive)] border border-[var(--color-surface-border)] shrink-0">
            <Target size={16} strokeWidth={1.75} className="text-[var(--color-accent)]" />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <h3 className="text-[14px] font-heading font-semibold text-[var(--color-text)] tracking-tight leading-none truncate">
              {topic}
            </h3>
            <span className="text-[11px] text-[var(--color-text-tertiary)] truncate">
              {subtopic}
            </span>
          </div>
        </div>

        {/* Progress Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.08em] text-[var(--color-text-disabled)]">
              Progress
            </span>
            <span className="text-[11px] font-mono font-semibold text-[var(--color-accent)] tabular-nums">
              {progress}%
            </span>
          </div>

          {/* Segmented Track */}
          <div className="flex gap-1 h-[3px] w-full">
            {Array.from({ length: segments }, (_, i) => (
              <div
                key={i}
                className={`flex-1 rounded-full transition-colors duration-400 ${i < filledCount
                    ? 'bg-[var(--color-accent)]'
                    : 'bg-[var(--color-surface-border)]'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </WidgetCover>
  );
}
