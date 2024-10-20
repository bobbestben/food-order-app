'use client';
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { isValidUserForm } from "@/libs/validation";
import { useSession } from "next-auth/react";

export default function EditUserPage() {
  const session = useSession();
  const { loading, data } = useProfile();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch('/api/profile?_id=' + id).then(res => {
      res.json().then(user => {
        setUser(user);
      });
    })
  }, []);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
      if (!isValidUserForm(data, reject)) {
        return;
      }
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, _id: id }),
      });
      if (res.ok) {
        resolve();
        // refresh page to update username in header when name of current user is updated
        if (session?.data?.user?.email == user?.email && user?.name !== data?.name) {
          window.location.reload();
        }
      } else {
        reject("Error saving user");
      }
    });

    await toast.promise(promise, {
      loading: 'Saving user...',
      success: 'User saved',
      error: promise.catch((error) => error),
    });
  }

  if (loading) {
    return 'Loading user profile...';
  }

  if (!data.admin) {
    return 'Not an admin';
  }

  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
}