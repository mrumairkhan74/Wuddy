import { useRef, useState } from "react";
import { FaImage, FaVideo, FaPaperclip } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { createPosts } from "../features/postsSlice";

const CreatePost = ({ user }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.post);

  const [newPost, setNewPost] = useState({ text: "", postImg: "", postVideo: "" });
  const [isOpen, setIsOpen] = useState(false);

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Open hidden file inputs
  const handleImageClick = () => imageInputRef.current.click();
  const handleVideoClick = () => videoInputRef.current.click();
  const handleFileClick = () => fileInputRef.current.click();

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedVideo(null);
      const newImageUrls = files.map((file) => URL.createObjectURL(file));
      setSelectedImages((prev) => [...prev, ...newImageUrls]);
    }
  };

  // Handle video selection
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImages([]);
      setSelectedVideo(URL.createObjectURL(file));
    }
  };

  // Create post handler
  const createPost = (e) => {
    e.preventDefault();
    if (!newPost.text.trim() && !imageInputRef.current?.files?.length && !videoInputRef.current?.files?.length) return;

    const formData = new FormData();
    formData.append("text", newPost.text);

    // Append images
    if (imageInputRef.current?.files?.length) {
      Array.from(imageInputRef.current.files).forEach((file) => {
        formData.append("postImg", file);
      });
    }

    // Append video
    if (videoInputRef.current?.files?.length) {
      formData.append("postVideo", videoInputRef.current.files[0]);
    }

    dispatch(createPosts(formData));

    // reset state
    setNewPost({ text: "", postImg: "", postVideo: "" });
    setSelectedImages([]);
    setSelectedVideo(null);
    setIsOpen(false);
  };


  return (
    <>
      {/* Top Post Bar */}
      <div className="sticky top-0 z-10 bg-white p-3 shadow-md w-full flex items-center gap-3 rounded-md">
        {/* Avatar */}
        <img
          src={user?.profileImg?.url}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-[#206059] rounded-full object-cover shadow"
          alt="avatar"
          loading="lazy"
        />

        {/* Input */}
        <div className="flex flex-col flex-1">
          <input
            type="text"
            placeholder="Share your thought..."
            className="w-full rounded-md p-2 outline-none text-sm sm:text-base text-gray-700 border border-gray-200 cursor-pointer"
            onClick={() => setIsOpen(true)}
            readOnly
          />

          {/* Options row (hidden on small screens) */}
          <div className="hidden sm:flex flex-wrap items-center gap-3 mt-2 text-gray-600 text-sm">
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
        </div>

        {/* Send button */}
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#206059] p-2 sm:px-4 sm:py-2 rounded-full text-white text-sm hover:bg-[#15423d] flex items-center justify-center"
        >
          <BsFillSendFill />
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex w-full items-center justify-center bg-black bg-opacity-50 z-40 px-2 sm:px-0">
          <div className="bg-white p-4 sm:p-6 rounded-md shadow-lg w-full sm:w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-[#206059]">Create Post</h2>

            {/* Textarea */}
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded-md mb-4 outline-none resize-none text-sm sm:text-base"
              placeholder="What's on your mind?"
              value={newPost.text}
              onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
            ></textarea>

            {/* Image Previews */}
            {selectedImages.length > 0 && (
              <div className="mb-4 grid grid-cols-2 gap-2">
                {selectedImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Preview"
                    loading="lazy"
                    className="w-full h-28 sm:h-32 object-cover rounded-md shadow"
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
                  className="w-full sm:w-[250px] h-40 sm:h-52 object-cover rounded-md shadow"
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
                className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-300 rounded-md hover:bg-gray-400 text-sm"
                onClick={() => {
                  setSelectedImages([]);
                  setSelectedVideo(null);
                  setIsOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                onClick={createPost}
                disabled={loading}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-[#206059] text-white rounded-md hover:bg-[#15423d] text-sm disabled:opacity-50"
              >
                {loading ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
