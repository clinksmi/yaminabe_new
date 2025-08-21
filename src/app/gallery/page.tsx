// src/app/gallery/page.tsx

'use client';

import { useState } from 'react';
import { GalleryImage, galleryImages } from '../../../data/galleryImages';
import Image from 'next/image';

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">ギャラリーページ</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {galleryImages.map((image: GalleryImage) => (
          <div
            key={image.id}
            className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg group cursor-pointer"
            onClick={() => handleImageClick(image)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="font-semibold">{image.alt}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            // ★ここを変更するよ！ max-w-3xl を max-w-5xl や max-w-6xl に変えてみてね。
            // あるいは、具体的なピクセル数を指定したいなら max-w-[1000px] のようにも書けるよ。
            className="relative bg-white rounded-lg p-4 max-w-5xl max-h-[90vh] overflow-hidden" // 例: max-w-5xl に変更
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-800 text-4xl font-bold leading-none z-10 hover:text-gray-600"
            >
              &times;
            </button>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={selectedImage.width}
              height={selectedImage.height}
              className="max-w-full max-h-[80vh] object-contain mx-auto"
            />
            {selectedImage.alt && (
              <p className="text-center text-gray-700 mt-4">{selectedImage.alt}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;