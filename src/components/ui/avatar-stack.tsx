import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export interface AvatarStackMember {
  name: string
  role: string
  initials: string
  src?: string | null
}

interface AvatarStackProps {
  members: AvatarStackMember[]
  /** Members beyond this count collapse into a "+N" overflow tooltip. */
  max?: number
  className?: string
}

export default function AvatarStack({
  members,
  max = 6,
  className,
}: AvatarStackProps) {
  const visible = members.slice(0, max)
  const overflow = members.slice(max)

  return (
    <div className={cn("flex min-h-[100px] items-center justify-center", className)}>
      <TooltipProvider>
        <div className="flex items-center">
          {visible.map((member, i) => (
            <Tooltip key={member.name}>
              <TooltipTrigger
                className="focus-visible:outline-none"
                style={{ zIndex: visible.length - i }}
              >
                <Avatar className="-ml-2.5 size-9 ring-2 ring-background transition-transform first:ml-0 hover:z-10 hover:-translate-y-1">
                  {member.src && (
                    <AvatarImage alt={member.name} src={member.src} />
                  )}
                  <AvatarFallback className="text-xs text-muted-foreground">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent className="px-3 py-2">
                <p className="font-medium">{member.name}</p>
                <p className="text-muted-foreground">{member.role}</p>
              </TooltipContent>
            </Tooltip>
          ))}

          {overflow.length > 0 && (
            <Tooltip>
              <TooltipTrigger className="-ml-2.5 focus-visible:outline-none">
                <div className="flex size-9 items-center justify-center rounded-full bg-muted font-medium text-muted-foreground text-xs ring-2 ring-background transition-colors hover:bg-muted/80">
                  +{overflow.length}
                </div>
              </TooltipTrigger>
              <TooltipContent className="px-3 py-2">
                <p className="mb-1 font-medium">{overflow.length} more mentors</p>
                <div className="space-y-0.5">
                  {overflow.map((member) => (
                    <p className="text-muted-foreground" key={member.name}>
                      {member.name}
                    </p>
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </TooltipProvider>
    </div>
  )
}
