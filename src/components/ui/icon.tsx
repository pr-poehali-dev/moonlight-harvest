import * as LucideIcons from 'lucide-react'
import { LucideProps } from 'lucide-react'

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: string
  fallback?: string
}

const Icon = ({ name, fallback = 'CircleAlert', ...props }: IconProps) => {
  const IconComponent = (LucideIcons as any)[name] || (LucideIcons as any)[fallback]
  
  if (!IconComponent) {
    return null
  }

  return <IconComponent {...props} />
}

export default Icon
