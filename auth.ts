import NextAuth, { Account, Profile, User } from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_ID } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write_client"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks:{
    async signIn({user, account, profile}: { user: User; account: Account | null; profile?: Profile }){
      const existtingUser = await client.withConfig({useCdn:false}).fetch(AUTHOR_ID, {id:profile?.id});
      if(!existtingUser){
        await writeClient.create({_type:'author', id:profile?.id, name: user?.name, username:profile?.login, email: user?.email, image: user?.image, bio: profile?.bio ||''});
      }
      return true;
    },
    async jwt ({token, account, profile}: { token: any; account?: any; profile?: any }){
      if(account && profile){
        const user = await client.withConfig({useCdn:false}).fetch(AUTHOR_ID, {id: profile?.id });
        token.id = user._id;
      }
      return token;
    },
    async session({session, token}: { session: any; token: any }){
      Object.assign(session, {id:token.id});
      return session;
    }
  }
})