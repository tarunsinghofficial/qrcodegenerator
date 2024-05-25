import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { data: session, status } = useSession();

    useEffect(() => {
      if (status === 'unauthenticated') {
        alert('You need to sign in to create a QR Code!')
        window.location.href = '/';
      }
    }, [status]);

    if (status === 'loading') {
      return <div>Loading...</div>; // You can add a loading spinner here
    }

    if (status === 'authenticated') {
      return <WrappedComponent {...props} />;
    }

    return null; // Return null if unauthenticated, redirect will happen in useEffect
  };
};

export default withAuth;
