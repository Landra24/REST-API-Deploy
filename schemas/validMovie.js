const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: z.number().int().positive().min(1900).max(2023),
  director: z.string(),
  duration: z.number().int().positive().min(10).max(300),
  poster: z.string().url().endsWith('.jpg'),
  rate: z.number().positive().max(10).default(1),
  genre: z.array(z.enum(['Action', 'Adventure', 'Drama', 'Crime', 'Sci-Fi', 'Romance', 'Biography']))
})

function validateMovie (object) {
  return movieSchema.safeParse(object)
}

function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}

// partial hace que las validaciones de movie schema sean opcionales
// es decir, si se encuentra el objeto, entonces valida las propiedades que se les manda

module.exports = {
  validateMovie,
  validatePartialMovie
}
