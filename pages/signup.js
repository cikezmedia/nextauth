import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {
  MdOutlineMarkAsUnread,
  MdVisibilityOff,
  MdVisibility,
  MdPersonOutline,
  MdOutlinePublic,
} from 'react-icons/md';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import bcrypt from 'bcryptjs';
import axios from 'axios';

const Login = () => {
  const [show, setShow] = useState({ password: false, cpassword: false });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleSignup = async (data, e) => {
    const { fullname, email, password, address } = data;
    e.preventDefault();
    setLoading(true);
    const options = {
      fullname,
      email,
      password: bcrypt.hashSync(password),
      address,
    };
    try {
      const res = await axios.post('/api/user/', options);
      if (res.status === 201) {
        setMessage('Your signup is successful, please login');
      } else if (res.status === 202) {
        setMessage('Your have already signed up, please login');
      } else {
        setMessage('Unable to register, please try again');
      }
      setLoading(false);
    } catch (error) {
      setMessage('An unknown error occured please try again.');
      setLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>Signup a free account</title>
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
                width='500'
                height='500'
                alt=''
                className='z-10'
              />
            </div>
            <div className='absolute bottom-10 left-0 cloud_one z-20'>
              <Image src='/assets/cloud_1.png' width={120} height={60} alt='' />
            </div>
            <div className='absolute bottom-40 cloud_two right-0 z-0'>
              <Image src='/assets/cloud_2.png' width={120} height={68} alt='' />
            </div>
          </div>

          <div className='flex flex-col lg:rounded-r-md lg:rounded-bl-none rounded-b-md bg-white p-6 gap-8'>
            <div className='flex flex-col gap-4 pt-5'>
              <h2 className='font-medium text-4xl text-center'>Signup</h2>
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
              className='flex flex-col gap-5 pb-6'
              onSubmit={handleSubmit(handleSignup)}
            >
              <div className='relative flex flex-col gap-1'>
                <div className='flex items-center'>
                  <input
                    type='text'
                    placeholder='full name'
                    name='fullname'
                    className={`border ${
                      errors.fullname
                        ? 'border-red-500 focus:border-red-500'
                        : 'focus:border-lightPurple border-lightPurple'
                    } w-full p-3 rounded-md focus:border-2 outline-none text-darkPurple pr-12`}
                    {...register('fullname', {
                      required: {
                        value: true,
                        message: 'fullname is required',
                      },
                      minLength: {
                        value: 6,
                        message: 'minimum of 6 characters is required',
                      },
                    })}
                  />
                  <span className='absolute right-4 cursor-pointer'>
                    <MdPersonOutline
                      className={`w-6 h-6 ${
                        errors.fullname ? 'text-red-500' : 'text-lightPurple'
                      }  hover:text-mainPurple`}
                    />
                  </span>
                </div>
                {errors.fullname && (
                  <span className='text-red-500 text-sm'>
                    {errors.fullname.message}
                  </span>
                )}
              </div>
              <div className='relative flex flex-col gap-1'>
                <div className='flex items-center'>
                  <input
                    placeholder='email'
                    name='email'
                    className={`border ${
                      errors.email
                        ? 'border-red-500 focus:border-red-500'
                        : 'focus:border-lightPurple border-lightPurple'
                    } w-full p-3 rounded-md focus:border-2 outline-none text-darkPurple pr-12`}
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
                  <span className='absolute right-4'>
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
                    type={`${show.password ? 'text' : 'password'}`}
                    placeholder='password'
                    name='password'
                    className={`border ${
                      errors.password
                        ? 'border-red-500 focus:border-red-500'
                        : 'focus:border-lightPurple border-lightPurple'
                    } w-full p-3 rounded-md focus:border-2 outline-none text-darkPurple pr-12`}
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
                    onClick={() =>
                      setShow({ ...show, password: !show.password })
                    }
                    className='absolute right-4 cursor-pointer'
                  >
                    {show.password ? (
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
              <div className='relative flex flex-col gap-1'>
                <div className='flex items-center'>
                  <input
                    type={`${show.cpassword ? 'text' : 'password'}`}
                    placeholder='confirm password'
                    name='cpassword'
                    className={`border ${
                      errors.cpassword
                        ? 'border-red-500 focus:border-red-500'
                        : 'focus:border-lightPurple border-lightPurple'
                    } w-full p-3 rounded-md focus:border-2 outline-none text-darkPurple pr-12`}
                    {...register('cpassword', {
                      required: {
                        value: true,
                        message: 'confirm password is required',
                      },
                      minLength: {
                        value: 6,
                        message: 'minimum of 6 characters is required',
                      },
                      validate: (val) => {
                        if (watch('password') != val) {
                          return 'password did not match';
                        }
                      },
                    })}
                  />
                  <span
                    onClick={() =>
                      setShow({ ...show, cpassword: !show.cpassword })
                    }
                    className='absolute right-4 cursor-pointer'
                  >
                    {show.cpassword ? (
                      <MdVisibilityOff
                        className={`w-6 h-6 ${
                          errors.cpassword ? 'text-red-500' : 'text-lightPurple'
                        }  hover:text-mainPurple`}
                      />
                    ) : (
                      <MdVisibility
                        className={`w-6 h-6 ${
                          errors.cpassword ? 'text-red-500' : 'text-lightPurple'
                        }  hover:text-mainPurple`}
                      />
                    )}
                  </span>
                </div>
                {errors.cpassword && (
                  <span className='text-red-500 text-sm'>
                    {errors.cpassword.message}
                  </span>
                )}
              </div>
              <div className='relative flex flex-col gap-1'>
                <div className='flex items-center'>
                  <input
                    type='text'
                    placeholder='address'
                    name='address'
                    className={`border ${
                      errors.address
                        ? 'border-red-500 focus:border-red-500'
                        : 'focus:border-lightPurple border-lightPurple'
                    } w-full p-3 rounded-md focus:border-2 outline-none text-darkPurple pr-12`}
                    {...register('address', {
                      required: {
                        value: true,
                        message: 'address is required',
                      },
                      minLength: {
                        value: 6,
                        message: 'address of 6 characters is required',
                      },
                    })}
                  />
                  <span className='absolute right-4 cursor-pointer'>
                    <MdOutlinePublic
                      className={`w-6 h-6 ${
                        errors.address ? 'text-red-500' : 'text-lightPurple'
                      }  hover:text-mainPurple`}
                    />
                  </span>
                </div>
                {errors.address && (
                  <span className='text-red-500 text-sm'>
                    {errors.address.message}
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
                      <span>Signing Up</span>
                    </div>
                  ) : (
                    <div className='flex text-center items-center mx-auto gap-4 content-center'>
                      <span>Signup</span>
                    </div>
                  )}
                </button>
              </div>
              <div className='flex flex-row items-center justify-between'>
                <span>Already a member?</span>
                <Link href='/login'>
                  <a className='text-mainPurple font-medium'>Login now</a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
