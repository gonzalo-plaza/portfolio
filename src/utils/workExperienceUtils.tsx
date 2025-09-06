/**
 * Checks if the bottom of the given element has passed above the viewport center.
 *
 * @param item - The DOM element to check.
 * @param viewportCenter - The vertical center position of the viewport.
 * @returns True if the element's bottom is above the viewport center, otherwise false.
 */
export const hasItemDisappearedFromCenter = (
  item: Element,
  viewportCenter: number
): boolean => {
  const itemRect = item.getBoundingClientRect();
  const itemBottomDistance = itemRect.bottom - viewportCenter;

  return itemBottomDistance < -75;
};

/**
 * Checks if the element is entering from the bottom of the viewport
 * but its top is still below the viewport center by more than 50px.
 *
 * @param item - The DOM element to check.
 * @param viewportCenter - The vertical center position of the viewport.
 * @returns True if the element's top is below the viewport center by more than 50px, otherwise false.
 */
export const isItemEnteringFromBottom = (
  item: Element,
  viewportCenter: number
): boolean => {
  const itemRect = item.getBoundingClientRect();
  const itemTopDistance = itemRect.top - viewportCenter;

  return itemTopDistance > 50;
};
