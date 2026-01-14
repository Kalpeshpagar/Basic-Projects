import React, {useEffect, useState } from 'react'

const initialUsers = [
  {
    name: "Kalpesh",
    pic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=60",
    bio: "Hey, Myself Kalpesh and I am a software developer",
  },
  {
    name: "Aarav",
    pic: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=600&auto=format&fit=crop&q=60",
    bio: "Frontend developer who loves React and clean UI design",
  },
  {
    name: "Riya",
    pic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=60",
    bio: "UI/UX designer with a passion for user-centered design",
  },
  {
    name: "Simran",
    pic: "https://plus.unsplash.com/premium_photo-1731492051217-450ced5b7431?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM4fHxwcm9maWxlJTIwcGljfGVufDB8fDB8fHww",
    bio: "Full stack developer working with MERN stack",
  },
  {
    name: "Sneha",
    pic: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=60",
    bio: "Creative coder and tech content creator",
  },
  {
    name: "Rahul",
    pic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=60",
    bio: "Backend engineer specializing in Node.js and databases",
  },
  {
    name: "Pooja",
    pic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=60",
    bio: "Software tester who loves breaking and fixing things",
  },
  {
    name: "Kunal",
    pic: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=60",
    bio: "DevOps enthusiast exploring cloud and automation",
  },
  {
    name: "Neha",
    pic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60",
    bio: "Passionate about JavaScript and modern web technologies",
  },
  {
    name: "Rohit",
    pic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60",
    bio: "Tech enthusiast learning DSA and system design",
  },
  {
    name: "Ananya",
    pic: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=600&auto=format&fit=crop&q=60",
    bio: "Aspiring software engineer and open-source contributor",
  },
];
const SearchAndFilterInput = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("users");
    if (stored) {
      setUsers(JSON.parse(stored));
    } else {
      setUsers(initialUsers);
      localStorage.setItem("users", JSON.stringify(initialUsers));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredUsers = initialUsers.filter((user) =>
    user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />

      <div style={styles.cards}>
        {filteredUsers.map((user, index) => (
          <div key={index} style={styles.card}>
            <img src={user.pic} alt={user.name} style={styles.img} />
            <h2 style={styles.name}>{user.name}</h2>
            <p style={styles.bio}>{user.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchAndFilterInput

const styles = {
  page: {
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "Segoe UI, sans-serif",
  },
  input: {
    display: "block",
    margin: "0 auto 30px",
    width: "100%",
    maxWidth: "400px",
    padding: "12px 16px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "14px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
    transition: "transform 0.3s, box-shadow 0.3s",
    },
  
  img: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "15px",
  },
  name: {
    fontSize: "20px",
    marginBottom: "8px",
    color: "#111827",
  },
  bio: {
    fontSize: "14px",
    color: "#6b7280",
    lineHeight: "1.5",
  },
};
