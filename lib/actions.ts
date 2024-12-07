"use server"

import { auth } from "@/auth"
import { parseServer } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write_client";

export const createPitch =async(state:any, form: FormData, pitch: string)=>{
    //check the author
    const session = await auth();
    //check if the session exist
    if(!session) return parseServer({error:'Not Signed In', status:"ERROR"});

    const {title, description, category, link} = Object.fromEntries(
        Array.from(form).filter(([key])=>key != 'pitch'),
    );
    const slug = slugify(title as string, {lower:true, strict:true});
    try{
        const review = {
            title,
            description,
            category,
            image:link,
            slug:{
                _type: slug,
                current: slug,
            },
            author:{
                _type: 'reference',
                _ref: session?.id,
            },
            pitch
        } ;
        //create
        const result = await writeClient.create({_type:'review', ...review});
        return parseServer({
            ...result,
            error: '',
            status: "OK",
        })
    }catch(err){
        console.log(err) ;
    }
}