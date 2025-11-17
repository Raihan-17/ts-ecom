import React, { useEffect, useState } from 'react';

interface Author {
  name: string;
  image: string;
  isFollowing: boolean;
}

const TopSellers = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=5');
        const data = await response.json();

        const authorData: Author[] = data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          image: user.picture.medium,
          isFollowing: false,
        }));
        setAuthors(authorData);
      } catch (error) {
        console.error("Error fetching top sellers:", error);
      }
    };
    fetchData();
  }, []);

  const handleFollowClick = (index: number) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((author, i) =>
        i === index ? { ...author, isFollowing: !author.isFollowing } : author
      )
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-700 to-gray-900 p-5 rounded-2xl text-white shadow-lg w-full">
      <h2 className="text-xl font-bold mb-4">🔝 Top Sellers</h2>
      <ul className="space-y-4">
        {authors.map((author, index) => (
          <li
            key={index}
            className="flex items-center justify-between hover:bg-gray-700/30 p-2 rounded-xl transition"
          >
            <div className="flex items-center">
              <img
                src={author.image}
                alt={author.name}
                className="w-12 h-12 rounded-full border-2 border-indigo-400 mr-3"
              />
              <span className="font-medium">{author.name}</span>
            </div>
            <button
              onClick={() => handleFollowClick(index)}
              className={`px-4 py-1 text-sm rounded-full font-semibold transition ${
                author.isFollowing
                  ? "bg-red-500 hover:bg-red-600 text-white shadow-md"
                  : "bg-indigo-500 hover:bg-indigo-600 text-white shadow-md"
              }`}
            >
              {author.isFollowing ? "Unfollow" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSellers;
