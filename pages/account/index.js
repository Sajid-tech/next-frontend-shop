import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image";
import { useRouter } from "next/router";


export default function Account() {


    const { data: session } = useSession();
    const router = useRouter();
    async function logout() {
        await signOut()
        await router.push('/')
    }


    if (session) {
        return (
            <div className="container mx-auto px-4 py-12 lg:py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="border-b border-gray-200 pb-8">
                        <h2 className="text-2xl font-semibold text-gray-900">Profile</h2>
                        <p className="mt-2 text-md text-gray-600">
                            This information will only be displayed to you.
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">Username</h3>
                            <p className="mt-1 text-md text-gray-600">{session.user.name}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">About</h3>
                            <p className="mt-1 text-md text-gray-600">You are one of the administrators of this dashboard.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">Photo</h3>
                            <div className="flex items-center mt-2">
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <Image src={session.user.image} alt={session.user.email} width={40} height={40} />
                                </div>
                                <button
                                    type="button"
                                    className="ml-4 inline-flex items-center px-2.5 py-1.5 text-md font-semibold text-gray-900 bg-white border border-gray-300 shadow-sm rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                >
                                    Change
                                </button>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">First Name</h3>
                            <p className="mt-1 text-md text-gray-600">{session.user.name.split(' ')[0]}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">Last Name</h3>
                            <p className="mt-1 text-md text-gray-600">{session.user.name.split(' ')[1]}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">Email Address</h3>
                            <p className="mt-1 text-md text-gray-600">{session.user.email}</p>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={logout}
                            className="inline-flex items-center px-4 py-2 text-md font-semibold text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <p className="text-2xl text-gray-900">You should sign up to view account information</p>
                <button
                    onClick={() => signIn('google')}
                    className="inline-block mt-6 px-4 py-2 text-md font-semibold text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
                >
                    Login / Register
                </button>
            </div>
        </div>
    )
}
