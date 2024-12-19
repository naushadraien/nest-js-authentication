import { envs } from "@/config/envs";
import authFetch from "@/lib/authFetch";

export default async function ProfilePage() {
  const res = await authFetch(`${envs.BACKEND_URL}/auth/me`);
  const user = await res?.json();

  return <div>{user?.name}</div>;
}
