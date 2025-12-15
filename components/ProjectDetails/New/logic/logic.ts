'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatCurrencyParts } from '@/utils/formateAmount';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import { ProjectType } from '@/redux/types';
import { shuffle } from '@/utils/shuffle';
import { useFetchAllPortraitBannersQuery } from '@/redux/portraitBannerAd/portraitBannerAdApi';
import { useViewAllProjectAdsCardsQuery } from '@/redux/projectAdsCard/projectAdsCardApi';

export function useProjectDetailsLogic(data: any, lead?: string, promoId?: string) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [imagesIndex, setImagesIndex] = useState(0);
  const [galleryModal, setGalleryModal] = useState(false);
  const [gallerySelected, setGallerySelected] = useState('images');
  const [userId, setUserId] = useState<string | null>(null);
  const [filteredProjectAdsCard, setFilteredProjectAdsCard] = useState<any[]>([]);

  const { currency, value } = formatCurrencyParts(data?.data?.priceInAED || 0);

  const propertyType = data?.data?.propertyTypes?.[0] ?? '';

  const handleBackTo = () => {
    const currency = searchParams.get('currency');
    const queryString = currency ? `?currency=${currency}` : '';
    if (window.history.length > 1) router.back();
    else router.push(`/${queryString}`);
  };

  const getProjectTypeLabel = (projectType: ProjectType): string => {
    const map: Record<ProjectType, string> = {
      'commercial-residential': 'Commercial & Residential',
      'project-commercial': 'Commercial Project',
      'project-residential': 'Residential Project',
      'resale-commercial': 'Commercial Resale',
      'resale-residential': 'Residential Resale',
      'secondary-residential': 'Secondary Residential',
      'land-commercial': 'Commercial Land',
      'land-residential': 'Residential Land',
      'secondary-commercial': 'Secondary Commercial',
    };
    return map[projectType];
  };


  

  
  useEffect(() => {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);
    if (raw) setUserId(JSON.parse(raw)._id);
  }, []);

  const { data: portraitBannerData } = useFetchAllPortraitBannersQuery({});
  const banners =
    portraitBannerData?.data?.filter(
      (item: any) => item.projectDetails.slug !== data?.data?.slug
    ) || [];

  const shuffledImages = useMemo(() => shuffle(banners), [banners]);

  const { data: projectAdsCard } = useViewAllProjectAdsCardsQuery({});

   const handleGallerySelect = (value: string) => {
    setGallerySelected(value);
  };

  const handleGalleryModal = () => setGalleryModal(prev => !prev);

  useEffect(() => {
    if (!projectAdsCard?.data?.length || !data?.data?._id) return;
    setFilteredProjectAdsCard(
      projectAdsCard.data.filter(
        (item: any) => item.projectDetails?._id !== data.data._id
      )
    );
  }, [projectAdsCard, data]);

  
  return {
    currency,
    value,
    imagesIndex,
    setImagesIndex,
    galleryModal,
    setGalleryModal,
    gallerySelected,
    setGallerySelected,
    getProjectTypeLabel,
    handleBackTo,
    handleGalleryModal,
    shuffledImages,
    filteredProjectAdsCard,
    userId,
    propertyType,
    handleGallerySelect,
  };
}
