'use client';
import Left from "@/components/icons/Left";
import Right from "@/components/icons/Right";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { isValidMenuItemForm } from "@/libs/validation";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function NewMenuItemPage() {

  const [categories, setCategories] = useState([]);
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch('/api/categories').then(res => {
      res.json().then(categories => {
        setCategories(categories);
      });
    });
  }, []);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      if (!isValidMenuItemForm(data, categories, reject)) {
        return;
      }
      const response = await fetch('/api/menu-items', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok)
        resolve();
      else
        reject("Error creating item");
    });

    await toast.promise(savingPromise, {
      loading: 'Saving this tasty item',
      success: 'Saved',
      error: savingPromise.catch((error) => error),
    });

    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect('/menu-items');
  }

  if (loading) {
    return 'Loading user info...';
  }

  if (!data.admin) {
    return 'Not an admin.';
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={'/menu-items'} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={null} categories={categories} onSubmit={handleFormSubmit} />
    </section>
  );
}