export const excludeProperty = <T, Key extends keyof T>(
  user: T,
  keys: Key[],
) => {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key as Key)),
  );
};
