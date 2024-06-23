import { signOut as nextAuthSignOut, getSession } from "next-auth/react";

async function customSignOut() {
  const session = await getSession();
  if (!session || !session.accessToken) {
    console.error("No session or access token found");
    await nextAuthSignOut();
    return;
  }

  try {
    const response = await fetch('http://localhost:3010/auth/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to log out');
    }

    console.log('Logout successful');
  } catch (error) {
    console.error('Logout failed', error);
  }

  await nextAuthSignOut();
}

export { customSignOut };