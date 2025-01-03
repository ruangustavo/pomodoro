import { useState } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  pomodoroDuration: number
  breakDuration: number
  onSave: (pomodoroDuration: number, breakDuration: number) => void
}

export function SettingsModal({
  isOpen,
  onClose,
  pomodoroDuration,
  breakDuration,
  onSave,
}: SettingsModalProps) {
  const [customPomodoroDuration, setCustomPomodoroDuration] =
    useState(pomodoroDuration)
  const [customBreakDuration, setCustomBreakDuration] = useState(breakDuration)

  const handleSave = () => {
    onSave(customPomodoroDuration, customBreakDuration)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurações</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pomodoro-duration">
              Duração do Pomodoro (minutos)
            </Label>
            <Input
              id="pomodoro-duration"
              type="number"
              value={Math.floor(customPomodoroDuration / 60)}
              onChange={e =>
                setCustomPomodoroDuration(
                  Math.max(1, Number(e.target.value)) * 60
                )
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="break-duration">
              Intervalo de descanso (minutos)
            </Label>
            <Input
              id="break-duration"
              type="number"
              value={Math.floor(customBreakDuration / 60)}
              onChange={e =>
                setCustomBreakDuration(Math.max(1, Number(e.target.value)) * 60)
              }
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
