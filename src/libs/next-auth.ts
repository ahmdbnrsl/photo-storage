import { NextAuthOptions, User as NextAuthUser } from 'next-auth';
import { checkIsOnSIA } from '@/services/checkIsOnSIA';
import CredentialsProvider from 'next-auth/providers/credentials';

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			full_name: string;
			number_wa: string;
		};
	}
}

export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
	},
	secret: process.env.SECRET_TOKEN,
	providers: [
		CredentialsProvider({
			type: 'credentials',
			name: 'credentials',
			credentials: {
				number_wa: {
					label: 'number_wa',
					type: 'number',
				},
			},
			async authorize(credentials) {
				const { number_wa } = credentials as {
					number_wa: string;
				};
				const check = await checkIsOnSIA(number_wa);

				if (check) {
					const user = {
						id: number_wa,
						number_wa,
					};
					return user as NextAuthUser;
				} else {
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, account, profile, user, trigger, session }: any) {
			if (account?.provider === 'credentials') {
				token = {
					...token,
					...user,
				};
			}
			return token;
		},

		async session({ session, token }: any) {
			session.user = {
				...session.user,
				...token._doc,
			};
			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
};
