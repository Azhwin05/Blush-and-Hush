import { Pressable, PressableProps, Text } from "react-native";

interface ButtonProps extends PressableProps {
    title: string;
    variant?: "primary" | "secondary" | "outline";
    className?: string;
}

export function Button({ title, variant = "primary", className, ...props }: ButtonProps) {
    const baseStyles = "p-4 rounded-2xl items-center shadow-lg active:opacity-80";
    const variants = {
        primary: "bg-primary",
        secondary: "bg-accent",
        outline: "border-2 border-primary bg-transparent",
    };
    const textStyles = {
        primary: "text-white",
        secondary: "text-white",
        outline: "text-primary",
    };

    return (
        <Pressable className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
            <Text className={`font-sans font-semibold ${textStyles[variant]}`}>{title}</Text>
        </Pressable>
    );
}
