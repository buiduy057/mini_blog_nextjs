import NextAuth, { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt", // sử dụng JWT cho session
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      // khi sign in, `user` tồn tại → gán thêm thông tin vào token
      if (user) {
        token.user = { id: user.id, email: user.email, name: user.name };
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // thêm user từ token vào session trả về cho client
      return { ...session, user: token.user || session.user };
    },
  },
  pages: {
    signIn: "/auth/signin", // redirect nếu chưa login
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
