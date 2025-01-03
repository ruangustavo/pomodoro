import { Button } from './ui/button'

interface CompletionMessageProps {
  onStartBreak: () => void
  onSkipBreak: () => void
}

export function CompletionMessage({
  onStartBreak,
  onSkipBreak,
}: CompletionMessageProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-2xl font-semibold text-zinc-700 dark:text-zinc-200">
        Parabéns! Você completou um pomodoro.
      </span>
      <Button className="w-36" size="lg" onClick={onStartBreak}>
        Descansar
      </Button>
      <Button
        className="w-36"
        size="lg"
        onClick={onSkipBreak}
        variant="outline"
      >
        Voltar
      </Button>
    </div>
  )
}
