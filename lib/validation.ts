import {z} from 'zod';

export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(5).max(500),
    category: z.string().min(3).max(10),
    link: z.string().url().refine(async(url)=>{
        try{
            const res= await fetch(url, {method: 'head'});
            const contentType = res.headers.get("contentType");
            if(contentType?.startsWith('image/')) {
                return true;
            }else{
                return false
            }
        }catch{
            return false
        }
    }),
    pitch: z.string().min(10),
})