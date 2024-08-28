import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AuthSuccessPage() {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token as string);
      router.push('/'); // Redirect to the home page or another page after storing the token
    }
  }, [token]);

  return <div>Authentication successful! Redirecting...</div>;
}
