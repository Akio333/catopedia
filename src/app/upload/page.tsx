"use client";

import { BREEDS } from "~/constants";
import { api } from "~/trpc/react";

export default function Upload() {
  const mutation = api.cats.uploadCat.useMutation({
    onSuccess: (data) => {
      alert(`Successfully uploaded!\n ${JSON.stringify(data)}`);
    },

    onError: (error) => {
      alert("Error Uploading:" + error.message);
    },

    onSettled: () => {
      alert("Upload Completed");
    },

    onMutate: () => {
      alert("Upload Started");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("image") as File | null;
    const breedId = formData.get("breed") as string | null;

    if (!(file instanceof File) || !breedId) {
      alert("Please select a file and a breed");
      return;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        try {
          mutation.mutate({
            image: base64,
            breedId: breedId,
            fileName: file.name,
          });
        } catch (error) {
          console.error("Failed to upload image:", error);
        }
      };
    }
  };

  return (
    <main className="min-h-screen bg-zinc-700 p-2 text-white">
      <div className="container mx-auto min-h-screen">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-4">
            <label htmlFor="breed" className="text-lg font-bold">
              Breed
            </label>
            <select
              name="breed"
              id="breed"
              className="w-full rounded-md border-2 border-zinc-500 p-2 text-black"
            >
              {BREEDS.map((breed) => (
                <option key={breed.id} value={breed.id}>
                  {breed.name}
                </option>
              ))}
            </select>
            <label htmlFor="image" className="text-lg font-bold">
              Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="w-full rounded-md border-2 border-zinc-500 p-2 text-black"
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full rounded-md border-2 border-zinc-500 p-2 text-black"
          >
            Upload
          </button>
        </form>
      </div>
    </main>
  );
}
