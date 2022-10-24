import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {
  MdOutlineMarkAsUnread,
  MdVisibilityOff,
  MdVisibility,
} from 'react-icons/md';
import { getSession, signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFacebookLogin = async () => {
    signIn('facebook', { callbackUrl: '/' });
  };

  const handleGoogleLogin = async () => {
    signIn('google', { callbackUrl: '/' });
  };

  const handleGithubLogin = async () => {
    signIn('github', { callbackUrl: '/' });
  };

  const handleLogin = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = data;
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/',
      //callbackUrl: `${window.location.origin}`
    });
    if (res.ok) {
      setLoading(false);
      router.push(res.url);
    } else if (res.status === 401) {
      setMessage('Login details incorrect');
      setLoading(false);
    } else {
      setMessage('Unknown error occured please try again.');
      setLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>Login to your account</title>
        <meta
          name='description'
          content='This Nextjs App is built to explain how NextAuth works using Google, Guthub, Facebook, Email login and MongoDB.'
        />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <div className='lg:h-screen bg-darkPurple'>
        <div className='grid grid-cols-1 mx-auto lg:grid-cols-2 p-3 lg:p-6 lg:pt-20 rounded-lg max-w-5xl'>
          <div className='relative flex flex-col lg:rounded-l-md rounded-t-lg lg:rounded-tr-none bg-lightPurple p-6'>
            <div className='lg:absolute -mb-6 lg:-mb-0 self-center flex align-middle bottom-0'>
              <Image
                src='/assets/img1.png'
                width='400'
                height='400'
                alt=''
                className='z-10'
              />
            </div>
            <div className='absolute bottom-2 left-0 cloud_one z-20'>
              <Image src='/assets/cloud_1.png' width={120} height={60} alt='' />
            </div>
            <div className='absolute bottom-28 cloud_two right-0 z-0'>
              <Image src='/assets/cloud_2.png' width={120} height={68} alt='' />
            </div>
          </div>

          <div className='flex flex-col lg:rounded-r-md lg:rounded-bl-none rounded-b-md bg-white p-6 gap-8'>
            <div className='flex flex-col gap-4 pt-5'>
              <h2 className='font-medium text-4xl text-center'>User login</h2>
              <p>
                This NextJS Authentication App is developed to illustrate how
                NextAuth works using Google, Guthub, Facebook, Email - Password
                and MongoDB.
              </p>
              {message.length > 1 && (
                <span className='flex flex-col text-center text-red-500 font-medium font-mono'>
                  {message}
                </span>
              )}
            </div>
            <form
              className='flex flex-col gap-5'
              onSubmit={handleSubmit(handleLogin)}
            >
              <div className='relative flex flex-col gap-1'>
                <div className='flex items-center'>
                  <input
                    placeholder='email'
                    name='email'
                    className={`border ${
                      errors.email
                        ? 'border-red-500 focus:border-red-500'
                        : 'focus:border-lightPurple border-lightPurple'
                    } w-full p-3 rounded-md focus:border-2 outline-none text-darkPurple `}
                    {...register('email', {
                      required: {
                        value: true,
                        message: 'email is required',
                      },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'enter a valid email',
                      },
                    })}
                  />
                  <span className='absolute right-3'>
                    <MdOutlineMarkAsUnread
                      className={`w-6 h-6 ${
                        errors.email ? 'text-red-500' : 'text-lightPurple'
                      }  hover:text-mainPurple`}
                    />
                  </span>
                </div>
                {errors.email && (
                  <span className='text-red-500 text-sm'>
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className='relative flex flex-col gap-1'>
                <div className='flex items-center'>
                  <input
                    type={`${show ? 'text' : 'password'}`}
                    placeholder='password'
                    name='password'
                    className={`border ${
                      errors.password
                        ? 'border-red-500 focus:border-red-500'
                        : 'focus:border-lightPurple border-lightPurple'
                    } w-full p-3 rounded-md focus:border-2 outline-none text-darkPurple `}
                    {...register('password', {
                      required: {
                        value: true,
                        message: 'password is required',
                      },
                      minLength: {
                        value: 6,
                        message: 'minimum of 6 characters is required',
                      },
                    })}
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className='absolute right-3 cursor-pointer'
                  >
                    {show ? (
                      <MdVisibilityOff
                        className={`w-6 h-6 ${
                          errors.password ? 'text-red-500' : 'text-lightPurple'
                        }  hover:text-mainPurple`}
                      />
                    ) : (
                      <MdVisibility
                        className={`w-6 h-6 ${
                          errors.password ? 'text-red-500' : 'text-lightPurple'
                        }  hover:text-mainPurple`}
                      />
                    )}
                  </span>
                </div>
                {errors.password && (
                  <span className='text-red-500 text-sm'>
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div>
                <button
                  type='submit'
                  disabled={`${loading ? 'disabled' : ''}`}
                  className='flex disabled:bg-mainPurple disabled:text-white bg-darkPurple text-white hover:bg-lightPurple hover:text-darkPurple font-semibold p-3 w-full rounded-md px-6'
                >
                  {loading ? (
                    <div className='flex text-center items-center mx-auto gap-4 content-center'>
                      <Image
                        src='/loading.svg'
                        width={25}
                        height={25}
                        alt='loading'
                      />
                      <span>Logging in</span>
                    </div>
                  ) : (
                    <div className='flex text-center items-center mx-auto gap-4 content-center'>
                      <span>Login</span>
                    </div>
                  )}
                </button>
              </div>
              <div className='flex flex-row items-center justify-between'>
                <span>Not yet a member?</span>
                <Link href='/signup'>
                  <a className='text-mainPurple font-medium'>Signup now</a>
                </Link>
              </div>
            </form>
            <div className='flex flex-col pb-6 gap-2'>
              <button
                onClick={handleGoogleLogin}
                className='flex flex-row justify-center items-center space-x-3 border-2 bg-gray-100 hover:bg-lightPurple border-lightPurple w-full rounded-md p-3'
              >
                <Image src='/assets/google.svg' width={18} height={18} alt='' />
                <span className=' text-darkPurple font-medium'>
                  Login with Google
                </span>
              </button>

              <button
                onClick={handleGithubLogin}
                className='flex flex-row justify-center space-x-3 border-2 bg-gray-100 items-center hover:bg-lightPurple border-lightPurple w-full rounded-md p-3'
              >
                <Image src='/assets/github.svg' width={20} height={20} alt='' />
                <span className=' text-darkPurple font-medium'>
                  Login with Github
                </span>
              </button>

              <button
                onClick={handleFacebookLogin}
                className='flex flex-row items-center justify-center space-x-3 border-2 bg-gray-100 hover:bg-lightPurple border-lightPurple w-full rounded-md p-3'
              >
                <Image
                  src='/assets/facebook.svg'
                  width={20}
                  height={20}
                  alt=''
                />
                <span className=' text-darkPurple font-medium'>
                  Login with Facebook
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
