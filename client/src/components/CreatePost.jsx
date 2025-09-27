import { useRef, useState } from "react";
import { FaImage, FaVideo, FaPaperclip } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";

const CreatePost = () => {
  const [isOpen, isSetOpen] = useState(false);

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const [selectedImages, setSelectedImages] = useState([]); // multiple images
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleVideoClick = () => {
    videoInputRef.current.click();
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedVideo(null); // clear video if user picks images
      const newImageUrls = files.map((file) => URL.createObjectURL(file));
      setSelectedImages((prev) => [...prev, ...newImageUrls]); // append instead of replace
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImages([]); // clear images if user picks video
      setSelectedVideo(URL.createObjectURL(file));
    }
  };

  return (
    <>
      {/* Post bar */}
      <div className="sticky bg-white p-3 shadow-md w-full m-2 flex flex-col justify-around  sm:flex-row items-start sm:items-center gap-3 rounded-md">
        {/* User avatar */}
        <div className="w-12 h-12 bg-[#206059] rounded-full shrink-0"></div>

        {/* Post input + options */}
        <div className="flex flex-col flex-1 w-full">
          {/* Input box */}
          <input
            type="text"
            placeholder="Share your thought..."
            className="w-full rounded-md p-2 outline-none text-sm text-gray-700"
            onClick={() => isSetOpen(!isOpen)}
          />

          {/* Options row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-2 text-gray-600 text-sm">
            <button
              className="flex items-center gap-1 hover:text-[#206059]"
              onClick={handleImageClick}
            >
              <FaImage /> Image
            </button>
            <button
              className="flex items-center gap-1 hover:text-[#206059]"
              onClick={handleVideoClick}
            >
              <FaVideo /> Video
            </button>
            <button
              className="flex items-center gap-1 hover:text-[#206059]"
              onClick={handleFileClick}
            >
              <FaPaperclip /> Other
            </button>
          </div>
        </div>

        {/* Post button */}
        <button className="bg-[#206059] px-4 py-2 rounded-full text-white text-sm hover:bg-[#15423d] self-end sm:self-auto">
          <BsFillSendFill />
        </button>
      </div>


      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex w-full items-center justify-center bg-black bg-opacity-50 z-40">
          <div className="bg-white p-6 rounded-md shadow-lg w-96 z-50">
            <h2 className="text-xl font-bold mb-4 text-[#206059]">Create Post</h2>

            {/* Textarea */}
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded-md mb-4 outline-none resize-none"
              placeholder="What's on your mind?"
            ></textarea>

            {/* Show multiple image previews */}
            {selectedImages.length > 0 && (
              <div className="mb-4 grid grid-cols-2 gap-2">
                {selectedImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-md shadow"
                  />
                ))}
              </div>
            )}

            {/* Show video preview */}
            {selectedVideo && (
              <div className="mb-4 flex justify-center">
                <video
                  src={selectedVideo}
                  controls
                  className="w-[200px] h-[200px] object-cover rounded-md shadow"
                />
              </div>
            )}

            {/* Upload buttons */}
            <div className="flex items-center justify-between mt-2 text-gray-600 text-sm">
              <button
                type="button"
                className="flex items-center gap-1 hover:text-[#206059]"
                onClick={handleImageClick}
              >
                <FaImage /> Image
              </button>
              <button
                type="button"
                className="flex items-center gap-1 hover:text-[#206059]"
                onClick={handleVideoClick}
              >
                <FaVideo /> Video
              </button>
              <button
                type="button"
                className="flex items-center gap-1 hover:text-[#206059]"
                onClick={handleFileClick}
              >
                <FaPaperclip /> Other
              </button>
            </div>

            {/* Hidden inputs */}
            <input
              type="file"
              accept="image/*"
              ref={imageInputRef}
              multiple
              className="hidden"
              onChange={handleImageChange}
            />
            <input
              type="file"
              accept="video/*"
              ref={videoInputRef}
              className="hidden"
              onChange={handleVideoChange}
            />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) =>
                console.log("Selected file:", e.target.files[0])
              }
            />

            {/* Action buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={() => {
                  setSelectedImages([]);
                  setSelectedVideo(null);
                  isSetOpen(false);
                }}
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-[#206059] text-white rounded-md hover:bg-[#15423d]">
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
