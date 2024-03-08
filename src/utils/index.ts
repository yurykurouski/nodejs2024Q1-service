import { randomUUID } from 'crypto';

export const generateUUID = () => randomUUID();

const UUID_REGEX =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89AB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/i;

export const isValidUUID = (uuid: string) =>
  typeof uuid === 'string' && UUID_REGEX.test(uuid);
