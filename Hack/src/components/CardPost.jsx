import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import AxiosInstance from "@/axios/axiosInstance";

const CardPost = ({ image, title, description, _id, user, isDeleteable }) => {
  const handleDelete = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this post?")) {
        const response = await AxiosInstance.delete("/user/post/" + _id);
        if (response.status == 200) {
          toast.success("Post deleted successfully!");
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  };
  return (
    <div>
      <div className="">
        <div className="mx-auto  max-w-xl my-2">
          <div className="bg-white shadow-2xl rounded-lg mb-6 tracking-wide">
            {image && (
              <div className="md:flex-shrink-0">
                <Link to={`/post/${_id}`}>
                  <img
                    src={image}
                    alt="mountains"
                    className="w-full h-64 rounded-lg rounded-b-none object-cover "
                  />
                </Link>
              </div>
            )}
            <div className="px-4 py-2 mt-2">
              <h2 className="font-bold text-2xl text-gray-800 tracking-normal">
                {title}
              </h2>
              <p className="text-sm text-gray-700 px-2 mr-1 line-clamp-2">
                {description.length > 300
                  ? `${description.slice(0, 300)}...`
                  : description}
              </p>
              <div className="flex items-center justify-between mt-2 mx-6">
                <a href="#" className="text-blue-500 text-xs -ml-3 "></a>
                <a href="#" className="flex text-gray-700">
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-blue-500"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  5
                </a>
              </div>
              <div className="author flex items-center -ml-3 my-3">
                <div className="user-logo">
                  <img
                    className="w-12 h-12 object-cover rounded-full mx-4  shadow"
                    src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80"
                    alt="avatar"
                  />
                </div>
                <h2 className="text-sm tracking-tighter text-gray-900">
                  <a
                    href={"/profile/" + user?._id}
                    className="font-bold text-slate-600"
                  >
                    By {user?.name}
                  </a>{" "}
                  <span className="text-gray-600 font-semibold ml-2 text-xs ">
                    {" "}
                    09 NOV 2024.
                  </span>
                </h2>
              </div>
              {isDeleteable && (
                <div>
                  <Button onClick={handleDelete} variant="destructive">
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPost;
