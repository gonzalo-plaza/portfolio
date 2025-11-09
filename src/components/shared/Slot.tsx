import clsx from "clsx";
import React from "react";

export type AsChildProps<DefaultElementProps> =
  | ({ asChild?: false } & DefaultElementProps)
  | { asChild: true; children: React.ReactElement };

type SlotProps<T extends React.ElementType> = {
  children?: React.ReactNode;
} & React.ComponentPropsWithRef<T>;

function isValidElement<T extends React.ElementType>(
  child: React.ReactNode
): child is React.ReactElement<React.ComponentPropsWithRef<T>> {
  return React.isValidElement(child);
}

const Slot = React.forwardRef(
  <T extends React.ElementType = "div">(
    { children, ...props }: SlotProps<T>,
    ref: React.Ref<Element>
  ) => {
    if (isValidElement<T>(children)) {
      return React.cloneElement(children, {
        ...props,
        ...children.props,
        ref,
        style: {
          ...props.style,
          ...children.props.style,
        },
        className: clsx(props.className, children.props.className),
      });
    }

    if (React.Children.count(children) > 1) {
      throw new Error("Only one child allowed");
    }

    return null;
  }
);

Slot.displayName = "Slot";

export { Slot };
