import React from 'react';

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-full pt-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
    );
};

export default Loader;
