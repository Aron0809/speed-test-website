import { Button } from "./button";
import { ChevronRight } from "lucide-react";

// 速度测试开始按钮组件 - 带有动画效果的现代按钮
export function GetStartedButton() {
  return (
    <Button className="group relative overflow-hidden" size="lg">
      {/* 按钮文本 - 鼠标悬停时透明度变为0 */}
      <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">
        Speed Test
      </span>
      {/* 右侧箭头图标 - 鼠标悬停时展开覆盖整个按钮 */}
      <i className="absolute right-1 top-1 bottom-1 rounded-sm z-10 grid w-1/4 place-items-center transition-all duration-500 bg-primary-foreground/15 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95 text-black-500">
        <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
      </i>
    </Button>
  );
} 