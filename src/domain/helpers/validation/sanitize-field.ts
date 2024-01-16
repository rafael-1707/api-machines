export const sanitizeStringField = (value: any): string => {
  return value.replace(/[^a-zA-Z-0-9-_.,!?´^`()]/g, '');
};
