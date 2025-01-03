import { cn } from '@/lib/utils'

interface RadialProgressProps {
  progress: number
  size: number
  strokeWidth: number
  className?: string
  children?: React.ReactNode
}

export function RadialProgress({
  progress,
  size,
  strokeWidth,
  className,
  children,
}: RadialProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center',
        className
      )}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-zinc-200 dark:stroke-zinc-700"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-primary dark:stroke-primary transition-all duration-500 ease-in-out"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      {children && (
        <div className="absolute flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  )
}
