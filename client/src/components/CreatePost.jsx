import { useRef, useState } from "react";
import { FaImage, FaVideo, FaPaperclip } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";

const CreatePost = ({ user }) => {
  const [isOpen, isSetOpen] = useState(false);

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleImageClick = () => imageInputRef.current.click();
  const handleVideoClick = () => videoInputRef.current.click();
  const handleFileClick = () => fileInputRef.current.click();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedVideo(null);
      const newImageUrls = files.map((file) => URL.createObjectURL(file));
      setSelectedImages((prev) => [...prev, ...newImageUrls]);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImages([]);
      setSelectedVideo(URL.createObjectURL(file));
    }
  };

  return (
    <>
      {/* Post bar */}
      <div className="sticky bg-white p-3 shadow-md w-full m-2 flex items-center gap-3 rounded-md">
        {/* Avatar */}
        <img
          src={user.profileImg?.url}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-[#206059] rounded-full object-cover shadow-lg"
          alt="avatar"
        />

        {/* Input & Options */}
        <div className="flex flex-col flex-1">
          <input
            type="text"
            placeholder="Share your thought..."
            className="w-full rounded-md p-2 outline-none text-sm text-gray-700 border border-gray-200"
            onClick={() => isSetOpen(true)}
          />

          {/* Options row - hidden on mobile */}
          <div className="hidden sm:flex flex-wrap items-center gap-3 mt-2 text-gray-600 text-sm">
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

        {/* Send button */}
        <button className="bg-[#206059] p-2 sm:px-4 sm:py-2 rounded-full text-white text-sm hover:bg-[#15423d] flex items-center justify-center">
          <BsFillSendFill />
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex w-full items-center justify-center bg-black bg-opacity-50 z-40">
          <div className="bg-white p-6 rounded-md shadow-lg w-11/12 sm:w-96 z-50">
            <h2 className="text-xl font-bold mb-4 text-[#206059]">Create Post</h2>

            {/* Textarea */}
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded-md mb-4 outline-none resize-none"
              placeholder="What's on your mind?"
            ></textarea>

            {/* Image Previews */}
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

            {/* Video Preview */}
            {selectedVideo && (
              <div className="mb-4 flex justify-center">
                <video
                  src={selectedVideo}
                  controls
                  className="w-[200px] h-[200px] object-cover rounded-md shadow"
                />
              </div>
            )}

            {/* Upload Buttons */}
            <div className="flex items-center justify-between mt-2 text-gray-600 text-sm">
              <button onClick={handleImageClick} className="flex items-center gap-1 hover:text-[#206059]">
                <FaImage /> Image
              </button>
              <button onClick={handleVideoClick} className="flex items-center gap-1 hover:text-[#206059]">
                <FaVideo /> Video
              </button>
              <button onClick={handleFileClick} className="flex items-center gap-1 hover:text-[#206059]">
                <FaPaperclip /> Other
              </button>
            </div>

            {/* Hidden Inputs */}
            <input type="file" accept="image/*" ref={imageInputRef} multiple className="hidden" onChange={handleImageChange} />
            <input type="file" accept="video/*" ref={videoInputRef} className="hidden" onChange={handleVideoChange} />
            <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => console.log("Selected file:", e.target.files[0])} />

            {/* Action Buttons */}
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
