import { z } from 'zod';

export const productZodSchema = z.object({
    nombre: z.string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(100, "Nombre demasiado largo"),
    descripcion: z.string()
        .max(200, "Máximo 200 caracteres")
        .optional(),
    codigo: z.string()
        .min(1, "El código es obligatorio"),
    marca: z.string()
        .optional()
});