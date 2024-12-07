import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { REVIEW_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import markdownit from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/app/components/View';

const md = markdownit();

export const experimental_ppr = true;

const page = async ({ params }: { params: { id: string } }) => {
    const id = (await params).id;
    const post = await client.fetch(REVIEW_BY_ID_QUERY, { id });
    if (!post) return notFound();
    const parseContent = md.render(post?.pitch || 'Empty');

    return (
        <>
            <section className="w-full bg-[#4c0a51dd] min-h-[530px] pattern flex justify-center items-center flex-col py-5 px-6 pattern !min-h-[230px]">
                <p className='px-6 py-3 font-work-sans font-bold rounded-sm uppercase relative tag-tri bg-[#eeddba]'>{formatDate(post?._createdAt)}</p>
                <h1 className='heading'>{post.title}</h1>
                <p className='font-medium text-[20px] text-white max-w-2xl text-center break-words !max-w-5xl'>{post.description}</p>
            </section>

            <section className='px-1 py-10 max-w-5xl mx-auto'>
                <div className='relative overflow-hidden rounded-xl shadow-lg'>
                    <img
                        src={post.image}
                        alt="post image"
                        className='w-full h-[400px] object-cover transition-transform duration-300 hover:scale-105'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent'></div>
                    <div className='absolute bottom-4 left-4 right-4 text-white'>
                        <h2 className='text-2xl font-bold mb-2'>{post.title}</h2>
                    </div>
                </div>
                <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
                    <div className='flex justify-between items-center gap-5'>
                        <a href={`/user/${post.author?._id}`} className='flex gap-2 items-center mb-3'>
                            <img src={post.author.image} alt="profile pic" width={78} height={78} className='rounded-full drop-shadow-xl' />
                            <div>
                                <p className='text-[30px]'>{post.author.name}</p>
                                <p className='text-[20px] text-gray-600'>@{post.author.username}</p>
                            </div>
                        </a>
                        {/* Small shape for category */}
                        <div className='flex items-center'>
                            <p className='font-medium text-[22px] bg-[#eeddba] px-8 py-4 rounded-full'>
                                {post.category}
                            </p>
                        </div>
                    </div>
                    <h3 className='text-[30px] font-bold'>
                        {parseContent ? (
                            <article className='prose max-w-4xl font-work-sans break-all' dangerouslySetInnerHTML={{ __html: parseContent }} />
                        ) : (
                            <p className='no-result'>No Details</p>
                        )}
                    </h3>
                </div>
                <hr className='divider'/>
                <Suspense fallback={<Skeleton className='bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3'/>}>
                    <View id={id}/>
                </Suspense>
            </section>

        </>
    );
}

export default page;