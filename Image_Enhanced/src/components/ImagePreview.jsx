import React from 'react';
import Loading from './Loading';

const ImagePreview = (props) => {
  return (
    <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl'>
      {/* Original Image */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <h2 className="text-xl font-semibold text-center bg-gray-800 text-white py-2">
          Original Image
        </h2>

        {props.uploaded ? (
          <img
            src={props.uploaded}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-80 bg-gray-200">
            No Image Selected
          </div>
        )}
      </div>
      
      {/* Preview Image */}
      <div className='bg-white shadow-lg rounded-xl overflow-hidden'>
        <h2 className='text-xl font-semibold text-center bg-blue-800 text-white py-2 cursor-pointer'>
          Enhanced Image
        </h2>

        {props.enhanced && !props.loading && (
          <img src={props.enhanced} alt="Enhanced" className='w-full h-full object-cover' />
        )}

        {props.loading ? (

        //   <div className='flex items-center justify-center h-80 bg-gray-200'>Loading...</div>
        <Loading />

        ) : (
            <div className='flex items-center justify-center h-80 bg-gray-200'>
              No Enhanced Selected
            </div>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
