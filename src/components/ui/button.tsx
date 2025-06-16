import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../utils/ui-helpers"

// 按钮样式变体配置 - 使用cva库定义不同的按钮样式
const buttonVariants = cva(
  // 基础样式 - 所有按钮共享的样式
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      // 按钮变体 - 不同的视觉样式
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90", // 默认主色调按钮
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90", // 危险操作按钮
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground", // 边框按钮
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80", // 次要按钮
        ghost: "hover:bg-accent hover:text-accent-foreground", // 幽灵按钮（透明背景）
        link: "text-primary underline-offset-4 hover:underline", // 链接样式按钮
      },
      // 按钮尺寸
      size: {
        default: "h-10 px-4 py-2", // 默认尺寸
        sm: "h-9 rounded-md px-3", // 小尺寸
        lg: "h-11 rounded-md px-8", // 大尺寸
        icon: "h-10 w-10", // 图标按钮
      },
    },
    // 默认变体
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

// 按钮组件属性接口
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean // 是否渲染为子元素而不是button标签
}

// 按钮组件 - 使用forwardRef支持ref传递
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // 根据asChild属性选择渲染的组件类型
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))} // 合并样式类名
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants } 