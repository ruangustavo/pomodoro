import { cn } from '../lib/utils'
import { RadialProgress } from './radial-progress'

interface TimerDisplayProps {
  isBreak: boolean
  isTimerPaused: boolean
  time: number
  progress: number
  // onAdjustTime: (action: 'increment' | 'decrement') => void
}

export function TimerDisplay({
  isBreak,
  isTimerPaused,
  time,
  progress,
  // onAdjustTime,
}: TimerDisplayProps) {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  return (
    <RadialProgress progress={progress} size={500} strokeWidth={6}>
      <div className="group flex items-center justify-center gap-2">
        {/* {!isTimerPaused && !isBreak && (
          <Button
            variant="ghost"
            className="opacity-0 group-hover:opacity-100 mb-5"
            onClick={() => onAdjustTime('decrement')}
          >
            <MinusCircleIcon />
          </Button>
        )} */}

        <div className="flex flex-col gap-2 items-center">
          <span className="text-7xl font-semibold text-zinc-700 dark:text-zinc-200 tabular-nums">
            {formatTime(time)}
          </span>

          <small
            className={cn(
              'text-muted-foreground text-base font-medium',
              isTimerPaused ? 'opacity-100' : 'opacity-0'
            )}
          >
            {isBreak
              ? 'Descansando'
              : isTimerPaused
                ? 'Pausado'
                : 'Trabalhando'}
          </small>
        </div>

        {/* {!isTimerPaused && !isBreak && (
          <Button
            variant="ghost"
            className="opacity-0 group-hover:opacity-100 mb-5"
            onClick={() => onAdjustTime('increment')}
          >
            <PlusCircleIcon />
          </Button>
        )} */}
      </div>
    </RadialProgress>
  )
}
