import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({ link, setLink }) {

  async function handleFileChange(ev) {
    const files = ev.target.files;

    const uploadPromise = new Promise(async (resolve, reject) => {
      if (files?.length === 1) {
        const data = new FormData;

        // validate file type
        const file = files[0];
        console.log(file);
        if (file.type != "image/png" && file.type != "image/jpeg") {
          reject('Invalid file type. Image must be in PNG or JPEG format only.');
          return;
        }

        data.set('file', files[0]);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: data,
        });
        if (response.ok) {
          resolve();
          return response.json().then(link => setLink(link));
        } else {
          reject("Error uploading image");
        }
      } else {
        return;
      }
    });

    await toast.promise(uploadPromise, {
      loading: 'Uploading...',
      success: 'Upload complete',
      error: uploadPromise.catch((error) => error),
    });
  }

  return (
    <>
      {link && (
        <Image className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt={'avatar'} />
      )}
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={handleFileChange} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">{link ? "Change image" : "Upload image"}</span>
      </label>
    </>
  );
}