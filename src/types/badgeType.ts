export type NavigatorWithBadge = Navigator & {
  setAppBadge?: (count: number) => void;
  setClientBadge?: ({ count }: { count: number }) => void;
};