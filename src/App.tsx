import { SettingsIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CompletionMessage } from './components/completion-message'
import { SettingsModal } from './components/settings-modal'
import { ThemeProvider } from './components/theme-provider'
import { TimerControls } from './components/timer-controls'
import { TimerDisplay } from './components/timer-display'
import { Button } from './components/ui/button'

const INITIAL_POMODORO_DURATION = 50 * 60
const BREAK_DURATION = 10 * 60

type TimerStatus = 'idle' | 'running' | 'paused'

export function App() {
  const [remainingTime, setRemainingTime] = useState(INITIAL_POMODORO_DURATION)
  const [pomodoroDuration, setPomodoroDuration] = useState(
    INITIAL_POMODORO_DURATION
  )
  const [initialPomodoroDuration, setInitialPomodoroDuration] = useState(
    INITIAL_POMODORO_DURATION
  )
  const [timerStatus, setTimerStatus] = useState<TimerStatus>('idle')
  const [isBreak, setIsBreak] = useState(false)
  const [breakTime, setBreakTime] = useState(BREAK_DURATION)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [customPomodoroDuration, setCustomPomodoroDuration] = useState(
    INITIAL_POMODORO_DURATION
  )
  const [customBreakDuration, setCustomBreakDuration] = useState(BREAK_DURATION)

  const isTimerRunning = timerStatus === 'running'
  const isTimerPaused = timerStatus === 'paused'
  const isPomodoroCompleted = remainingTime === 0 && !isBreak

  const handleStartPomodoro = () => {
    setTimerStatus('running')
    setIsBreak(false)

    if (isTimerPaused) {
      setTimerStatus('running')
      return
    }

    setInitialPomodoroDuration(pomodoroDuration)
    setRemainingTime(pomodoroDuration)
  }

  const handleStopPomodoro = () => {
    setTimerStatus('idle')
    setRemainingTime(pomodoroDuration)
  }

  const handlePausePomodoro = () => {
    setTimerStatus('paused')
  }

  const handleStartBreak = () => {
    setIsBreak(true)
    setBreakTime(customBreakDuration)
    setTimerStatus('running')
  }

  const handleSkipBreak = () => {
    setIsBreak(false)
    setTimerStatus('idle')
    setBreakTime(customBreakDuration)
    setRemainingTime(customPomodoroDuration)
    setPomodoroDuration(customPomodoroDuration)
  }

  // const handleAdjustTime = (
  //   action: 'increment' | 'decrement',
  //   amount = 300
  // ) => {
  //   setPomodoroDuration(prevDuration => {
  //     const newDuration =
  //       action === 'increment' ? prevDuration + amount : prevDuration - amount

  //     if (newDuration < 0) return prevDuration

  //     setRemainingTime(prevTime => {
  //       const newTime =
  //         action === 'increment' ? prevTime + amount : prevTime - amount
  //       return newTime < 0 ? 0 : newTime
  //     })

  //     return newDuration
  //   })
  // }

  const handleSaveSettings = (
    pomodoroDuration: number,
    breakDuration: number
  ) => {
    setCustomPomodoroDuration(pomodoroDuration)
    setCustomBreakDuration(breakDuration)
    setPomodoroDuration(pomodoroDuration)
    setBreakTime(breakDuration)
  }

  const elapsedTime = initialPomodoroDuration - remainingTime
  const progress = (elapsedTime / initialPomodoroDuration) * 100

  useEffect(() => {
    if (!isTimerRunning) return

    const interval = setInterval(() => {
      if (isBreak) {
        setBreakTime(prevTime => {
          if (prevTime === 0) {
            setTimerStatus('idle')
            setIsBreak(false)
            return 0
          }
          return prevTime - 1
        })
      } else {
        setRemainingTime(prevTime => {
          if (prevTime === 0) {
            setTimerStatus('idle')
            return 0
          }
          return prevTime - 1
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isTimerRunning, isBreak])

  return (
    <ThemeProvider storageKey="pomodoro-theme" defaultTheme="dark">
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col gap-6">
          <Button
            variant="ghost"
            className="absolute top-4 right-4"
            onClick={() => setIsSettingsModalOpen(true)}
          >
            <SettingsIcon className="size-5" />
          </Button>

          {isPomodoroCompleted ? (
            <CompletionMessage
              onStartBreak={handleStartBreak}
              onSkipBreak={handleSkipBreak}
            />
          ) : (
            <TimerDisplay
              isBreak={isBreak}
              isTimerPaused={isTimerPaused}
              time={isBreak ? breakTime : remainingTime}
              progress={progress}
              // onAdjustTime={handleAdjustTime}
            />
          )}

          <TimerControls
            isTimerRunning={isTimerRunning}
            isTimerPaused={isTimerPaused}
            isBreak={isBreak}
            isPomodoroCompleted={isPomodoroCompleted}
            onStartPomodoro={handleStartPomodoro}
            onPausePomodoro={handlePausePomodoro}
            onStopPomodoro={handleStopPomodoro}
          />
        </div>
        <SettingsModal
          isOpen={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
          pomodoroDuration={customPomodoroDuration}
          breakDuration={customBreakDuration}
          onSave={handleSaveSettings}
        />
      </div>
    </ThemeProvider>
  )
}
