import React from 'react'

const PostPage = () => {
    const today = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
    return (
        <div className='w-full p-3 h-[500px] overflow-y-auto'>
            <div className="flex flex-col">
                <div className="flex gap-3 items-center">
                    <div className="w-15 h-15 overflow-hidden bg-[#206059] rounded-full"></div>
                    <div className="flex flex-col items-start mb-1">
                        <h4>Umair Khan</h4>
                        <p className='text-[10px] text-slate-400'>{today}</p>
                    </div>
                </div>
                
                <div className="bg-gray-200 "></div>
            </div>
        </div>
    )
}

export default PostPage