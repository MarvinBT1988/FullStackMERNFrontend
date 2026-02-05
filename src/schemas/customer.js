import { z } from 'zod';
export const customerZodSchema = z.object({
  nombre: z
    .string({ required_error: 'El nombre es obligatorio' })
    .min(1, 'El nombre no puede estar vacío'),
    
  direccion: z
    .string()
    .optional(),

  DUI: z
    .string({ required_error: 'El DUI es obligatorio' })
    .trim()
    .regex(/^\d{8}-\d{1}$/, 'Por favor, ingresa un formato de DUI válido (00000000-0)'),

  telefono: z
    .string()
    .optional()
});