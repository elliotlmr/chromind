import Link from 'next/link';

export default function SignIn() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-2xl font-bold'>Sign In</h1>
      <form className='flex flex-col mt-4'>
        <input
          type='email'
          placeholder='Email'
          className='mb-2 p-2 border border-gray-300 rounded'
        />
        <input
          type='password'
          placeholder='Password'
          className='mb-2 p-2 border border-gray-300 rounded'
        />
        <button type='submit' className='btn btn-primary'>
          Sign In
        </button>
        <Link href='/auth/sign-up' className='btn btn-link'>
          No account yet ? Sign up.
        </Link>
      </form>
    </div>
  );
}
