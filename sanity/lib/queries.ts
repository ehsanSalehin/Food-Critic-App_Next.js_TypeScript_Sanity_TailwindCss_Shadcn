import { defineQuery } from "next-sanity";

export const REVIEW_QUERY = defineQuery(`*[_type =="review" && defined(slug.current) && !defined($search) ||title match $search || category match $search || author -> name match $search]|order(_createdAt desc){
    _id,title,slug,_createdAt, author ->{_id, name, image, bio}, views, description,category,image,
    }`)


    export const REVIEW_BY_ID_QUERY = defineQuery(`*[_type == "review" && _id == $id][0]{
        _id,
        title,
        slug,
        _createdAt,
        author->{
            _id,
            name,
            image,
            bio,
            username
        },
        views,
        description,
        category,
        image,
        pitch
    }`)

export const REVIEW_VIEWS_QUERY = defineQuery(
    `*[_type == "review" && _id ==$id][0]{
        _id, views
    }`
);

export const AUTHOR_ID = defineQuery(
    `*[_type == 'author' && id ==$id][0]{
        _id,
        id,
        name,
        username,
        email,
        image,
        bio
    }`
);