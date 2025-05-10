import Link from 'next/link';

export default function SignUp() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-2xl font-bold'>Sign Up</h1>
      <form className='flex flex-col w-full max-w-sm mt-4'>
        <input
          type='text'
          placeholder='Username'
          className='p-2 mb-4 border rounded'
        />
        <input
          type='email'
          placeholder='Email'
          className='p-2 mb-4 border rounded'
        />
        <input
          type='password'
          placeholder='Password'
          className='p-2 mb-4 border rounded'
        />
        <button type='submit' className='btn btn-primary'>
          Sign Up
        </button>
        <Link href='/auth/sign-in' className='btn btn-link'>
          Already have an account ? Sign in.
        </Link>
      </form>
    </div>
  );
}
