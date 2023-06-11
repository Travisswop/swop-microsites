import * as z from 'zod';

export const ogImageSchema = z.object({
  name: z.string(),
  avatar: z.string(),
  bio: z.string(),
  mode: z.enum(['light', 'dark']).default('dark'),
});
