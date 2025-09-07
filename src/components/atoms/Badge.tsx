import styles from "@/styles/components/molecules/badge.module.scss";
import clsx from "clsx";
import React from "react";

interface BaseBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  Icon?: (iconProps: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  iconWidth?: number;
  iconHeight?: number;
  children: React.ReactNode;
  className?: string;
}

interface VariantBadgeProps extends BaseBadgeProps {
  variant: "primary" | "secondary";
  backgroundColor?: undefined;
}

interface CustomBadgeProps extends BaseBadgeProps {
  variant: "custom";
  backgroundColor: string;
}

type BadgeProps = VariantBadgeProps | CustomBadgeProps;

const Badge = ({
  children,
  className,
  iconHeight = 16,
  iconWidth = 16,
  backgroundColor,
  Icon,
  variant,
  ...nativeProps
}: BadgeProps) => {
  const style = variant === "custom" ? { backgroundColor } : undefined;
  return (
    <span
      className={clsx(
        styles.badge,
        {
          [styles.isPrimary]: variant === "primary",
        },
        className
      )}
      style={style}
      {...nativeProps}
    >
      {Icon && <Icon width={iconHeight} height={iconWidth} />}
      {children}
    </span>
  );
};

export default Badge;
