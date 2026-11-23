export const getTestId = (testId: string) =>
  import.meta.env.MODE === 'test' ? testId : undefined;
