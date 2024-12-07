import { client } from "@/sanity/lib/client";
import ReviewCard, { ReviewTypeCard } from "../components/ReviewCard";
import Searchform from "../components/Searchform";
import { REVIEW_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/lib/live";
import { auth } from "@/auth";

export default async function Home({ searchParams }: { searchParams: { query?: string } }) {
  const query = searchParams.query;
  const params = {search: query || null};
  const session = await auth();
  const {data:posts} = await sanityFetch({query: REVIEW_QUERY, params });

  return (
    <>
    <section className="w-full bg-[#0b4157dd] min-h-[530px] pattern flex justify-center items-center flex-col py-5 px-6 pattern">
      <h1 className="heading">
      Explore and rate<br/> global restaurant adventures
      </h1>
      <p className="font-medium text-[20px] text-white max-w-2xl text-center break-words">Savor, rate, and share dining adventures.</p>
      <Searchform query={query}/>
    </section>




    <section className="px-6 py-10 max-w-7xl mx-auto">
      <p className="text-[30px] font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 leading-tight tracking-wide mb-4 text-center shadow-lg p-4 rounded-lg">
        {query?`Search results for "${query}"`:'Reviews'}
      </p>
      <ul className="mt-7 grid md:grid-cols-3 sm:grid-cols-2 gap-5"  >
          {posts?.length > 0 ? (
            posts.map((post: ReviewTypeCard) => (
              <ReviewCard key={post.author?._id} post={post} />
            ))
          ) : (
            <p>No Restaurant Found</p>
          )}
      </ul>
    </section>
      
      <SanityLive/>
    </>
  );
}
