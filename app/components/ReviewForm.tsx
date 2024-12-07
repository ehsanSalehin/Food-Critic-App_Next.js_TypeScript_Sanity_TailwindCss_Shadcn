"use client";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useActionState, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import { createPitch } from '@/lib/actions';

const ReviewForm = () => {
    const [error, setError]=useState<Record<string, string>>({});
    const [value, setValue] = React.useState("**Type Here!**");
    const [pitch, setPitch] =useState("");
    const handle =async(prev: any, formData: FormData)=>{
        try{
            const form = {
                title: formData.get("title")as string,
                description: formData.get("description")as string,
                category: formData.get("category")as string,
                link: formData.get("link")as string,
                pitch,
            }
            await formSchema.parseAsync(form);
            const result = await createPitch(prev, formData, pitch)
            
        }catch(err){
            if(err instanceof z.ZodError){
                const filedError = err.flatten().fieldErrors;
                setError(filedError as unknown as Record<string, string>);
                return {...prev, error:'validation failed', status: "ERROR"}
            }
        }
    };

    const [state, formAction, pending] = useActionState(handle, {error: '', status:"initial"});

  return (  
    <>
<form action={formAction} className="max-w-2xl mx-auto bg-white my-10 p-8 rounded-lg shadow-lg">
  <div className="space-y-6">
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
        Title
      </label>
      <Input
        id="title"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter title"
      />
      {error.title && <p className="text-red-500 text-xs mt-1">{error.title}</p>}
    </div>

    <div>
      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
        Description
      </label>
      <Textarea
        id="description"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter description"
        rows={4}
      />
      {error.description && <p className="text-red-500 text-xs mt-1">{error.description}</p>}
    </div>

    <div>
      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
        Category
      </label>
      <Input
        id="category"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter category"
      />
      {error.category && <p className="text-red-500 text-xs mt-1">{error.category}</p>}
    </div>

    <div>
      <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
        Image Link
      </label>
      <Input
        id="link"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter image link"
      />
      {error.link && <p className="text-red-500 text-xs mt-1">{error.link}</p>}
    </div>

    <div>
      <label htmlFor="pitch" className="block text-sm font-medium text-gray-700 mb-1">
        Your Review
      </label>
      <div data-color-mode="light">
        <MDEditor
          value={value}
          onChange={(value) => setValue(value as string)}
          id="pitch"
          preview="edit"
          height={200}
          className="border border-gray-300 rounded-md overflow-hidden"
        />
      </div>
      {error.pitch && <p className="text-red-500 text-xs mt-1">{error.pitch}</p>}
    </div>
  </div>

  <Button
    type="submit"
    className="w-full mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    disabled={pending}
  >
    {pending ? 'Sending...' : 'Send Your Review'}
    <Send className="inline-block ml-2 w-5 h-5" />
  </Button>
</form>
    </>
  )
}

export default ReviewForm