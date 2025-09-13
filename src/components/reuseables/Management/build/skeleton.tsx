// Skeleton Component - Reusable skeleton loading component
// Cung cấp skeleton đẹp mắt cho loading states

export const Skeleton = ({ className = '' }: { className?: string }) => {
    return (
        <div
            className={`animate-pulse bg-gray-700/50 rounded-md ${className}`}
        />
    );
};
