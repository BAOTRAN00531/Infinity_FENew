import * as TooltipPrimitive from '@radix-ui/react-tooltip';

// Tooltip Component - Reusable tooltip component
// Cung cấp tooltip đẹp mắt để hiển thị thông tin bổ sung khi hover

export const Tooltip = ({
                            children,
                            content,
                        }: {
    children: React.ReactNode;
    content: string;
}) => (
    <TooltipPrimitive.Provider delayDuration={200}>
        <TooltipPrimitive.Root>
            <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
            <TooltipPrimitive.Portal>
                <TooltipPrimitive.Content
                    sideOffset={5}
                    className="z-50 rounded px-3 py-1.5 text-sm bg-black text-white shadow-md"
                >
                    {content}
                </TooltipPrimitive.Content>
            </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
);
