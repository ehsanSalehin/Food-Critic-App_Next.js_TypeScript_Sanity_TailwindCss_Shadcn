import { defineField, defineType } from "sanity";

export const review = defineType({
    name:"review",
    title: "Review",
    type: 'document',
    fields: [
        defineField({
            name:'slug',
            type: 'slug',
            options:{
                source:'title'
            }
        }),
        defineField({
            name:'title',
            type: 'string',
        }),
        defineField({
            name:'views',
            type: 'number',
        }),
        defineField({
            name:'author',
            type: 'reference',
            to: [{ type: 'author' }]
        }),
        defineField({
            name:'descritption',
            type: 'text',
        }),
        defineField({
            name:'category',
            type: 'string',
            validation: (Rule) => Rule.min(1).max(20).required().error("Please enter a category"),
        }),
        defineField({
            name:'image',
            type: 'url',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name:'pitch',
            type: 'markdown',
        }),
    ],
});