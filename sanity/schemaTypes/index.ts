import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { review } from './review'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, review],
}
