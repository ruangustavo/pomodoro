import { Button } from './ui/button'

interface TimerControlsProps {
  isTimerRunning: boolean
  isTimerPaused: boolean
  isBreak: boolean
  isPomodoroCompleted: boolean
  onStartPomodoro: () => void
  onPausePomodoro: () => void
  onStopPomodoro: () => void
}

export function TimerControls({
  isTimerRunning,
  isTimerPaused,
  isBreak,
  isPomodoroCompleted,
  onStartPomodoro,
  onPausePomodoro,
  onStopPomodoro,
}: TimerControlsProps) {
  return (
    <>
      {!isTimerRunning && !isBreak && !isPomodoroCompleted && (
        <Button className="w-36 mx-auto" size="lg" onClick={onStartPomodoro}>
          {isTimerPaused ? 'Continuar' : 'Iniciar'}
        </Button>
      )}

      {isTimerRunning && !isBreak && !isPomodoroCompleted && (
        <Button
          className="w-36 mx-auto"
          size="lg"
          variant="outline"
          onClick={onPausePomodoro}
        >
          Pausar
        </Button>
      )}

      <div className="h-12 mx-auto">
        {isTimerPaused && !isBreak && (
          <Button
            className="w-36"
            size="lg"
            onClick={onStopPomodoro}
            variant="outline"
          >
            Parar
          </Button>
        )}
      </div>
    </>
  )
}
