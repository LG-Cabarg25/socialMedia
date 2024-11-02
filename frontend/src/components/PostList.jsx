import { usePosts } from '../context/PostContext';
import { useState } from 'react';
import { FaEllipsisH, FaThumbsUp, FaCommentAlt, FaShare } from 'react-icons/fa';

const PostList = () => {
  const { posts, likePostById, removePost } = usePosts();
  const [selectedPostId, setSelectedPostId] = useState(null);

  const toggleOptions = (postId) => {
    setSelectedPostId(selectedPostId === postId ? null : postId);
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-4 relative">
          {/* Header de la publicación */}
          <div className="flex justify-between items-center">
            <div className="text-gray-700 font-semibold">Usuario {post.user_id}</div>
            <button
              onClick={() => toggleOptions(post.id)}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <FaEllipsisH />
            </button>
            {selectedPostId === post.id && (
              <div className="absolute top-8 right-4 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
                <button
                  onClick={() => removePost(post.id)}
                  className="px-4 py-2 text-red-500 hover:bg-red-100 w-full text-left"
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>

          {/* Contenido de la publicación */}
          <p className="mt-2 text-gray-700">{post.content}</p>
          {post.image_url && (
            <img
              src={`http://localhost:3000/${post.image_url}`}
              alt="Post"
              className="w-full mt-4 rounded-md"
            />
          )}

          {/* Fecha de creación */}
          <small className="text-gray-500 mt-2 inline-block">{new Date(post.created_at).toLocaleString()}</small>

          {/* Separador */}
          <hr className="my-4" />

          {/* Botones de interacción */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => likePostById(post.id)}
              className="flex items-center space-x-1 text-blue-500 hover:text-blue-600"
            >
              <FaThumbsUp />
              <span>Me gusta ({post.likes_count})</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-600">
              <FaCommentAlt />
              <span>Comentar</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-600">
              <FaShare />
              <span>Compartir</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
