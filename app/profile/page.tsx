'use client'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { user_icon } from '../assets'
import { RootState } from '@/redux/store'
import Header from '@/components/Header'
import { Footer } from '@/components/Footer'
import Typography from '@/components/atom/typography/Typography'
import { useEditProfileMutation } from '@/redux/auth/authApi'
import { useCloudinaryUpload } from '@/utils/cloudinary/useCloudinaryUpload'
import { FolderName } from '@/redux/types'
import { LOCAL_STORAGE_KEYS } from '@/api/storage'

function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { ready, user, isAuthentication } = useSelector((state: RootState) => state.user);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // ✅ Use the custom hook at top level (rule of hooks)
  const { uploadImage } = useCloudinaryUpload();
  const [editProfile] = useEditProfileMutation();

  useEffect(() => {
    if (ready && !isAuthentication) {
      router.push('/login');
    }
  }, [ready, isAuthentication]);

  useEffect(() => {
    if (!selectedImage) return;
    const objectUrl = URL.createObjectURL(selectedImage);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    try {
      setIsUploading(true);

      const uploadedImage = await uploadImage(selectedImage, FolderName.Users);

      if (uploadedImage) {
        const payload = { avatar: uploadedImage };
        await editProfile(payload).unwrap();
        const userData = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);
        if (!userData) return;
        const userDataConverted = JSON.parse(userData);
        userDataConverted.avatar = uploadedImage;
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER_DATA, JSON.stringify(userDataConverted));

      } else {
        alert('Image upload failed.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to upload image.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main>
      <div className="max-w-[1440px] mx-auto w-full font-[family-name:var(--font-geist-sans)]">
        <Header />
        <div className="px-5 lg:px-8 xl:px-[144px] space-y-4">

          <Typography tag="h3" text="Your Profile" />

          <div className="flex flex-col items-center gap-2">
            <div className="bg-red-600/10 relative flex justify-center items-center rounded-full h-24 w-24 overflow-hidden">
              <Image
                src={previewUrl || user?.avatar?.secure_url || user_icon}
                width={96}
                height={96}
                alt="User"
                className="object-cover w-full h-full"
              />
            </div>

            <label className="text-sm text-gray-700 font-medium cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              Change Profile Photo
            </label>

            {selectedImage && (
              <button
                onClick={handleImageUpload}
                disabled={isUploading}
                className="mt-2 px-4 py-2 bg-red-600/80 text-white rounded hover:bg-red-700 transition"
              >
                {isUploading ? 'Uploading...' : 'Submit'}
              </button>
            )}
          </div>

          <div className="p-4 space-y-2">
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
          </div>

          <div>
            <label className='text-sm font-medium'>Phone</label>
            <div className="border w-[300px] border-[#DEDEDE] rounded px-4 py-2">
              {user?.number}
            </div>
          </div>

          <div>
            <label className='text-sm font-medium'>Email</label>
            <div className="border w-[300px] border-[#DEDEDE] rounded px-4 py-2">
              {user?.email}
            </div>
          </div>

          <div className="flex h-10 gap-2">
            <button onClick={() => router.push('/edit-profile')} className='px-4 py-2 rounded bg-red-600/10'>Edit Profile</button>
            <button className='px-4 py-2 rounded bg-red-600/10'>Change Password</button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default ProfilePage
