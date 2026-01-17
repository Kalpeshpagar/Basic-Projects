import React from "react";
import { useFetch } from "../hooks/useFetch";
import { getPosts } from "../services/api";

const Posts = () => {
    const { data: posts, loading, error, refetch } = useFetch(getPosts);

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <div style={styles.userMain}>
                <h2>Posts</h2>
            <button style={styles.refreshBtn} onClick={refetch}>Refresh</button>
            </div>

            <div style={styles.main}>
                {posts.map((post) => (
                    <div style={styles.container} key={post.id}>
                        <h4>{post.title}</h4>
                        <p>{post.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    main: {
        // height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        // flexDirection: "column",
        flexWrap: "wrap",
        position: "absolute",
        marginTop: "100px",
        zIndex:"0"

    },
    h2: {
        fontFamily: "Arial",
        fontSize: "10px",
    },
    refreshBtn: {
        padding: "10px",
        color: "white",
        border: "none",
        borderRadius: "8px",
        backgroundColor:"blue",
        cursor: "pointer"
    },
    container: {
        maxWidth: "400px",
        padding: "5px",
        border: "2px solid black",
        margin: "5px"
    },
    userMain: {
        width: "100%",
        border: "2px solid white",
        backgroundColor: "#b5e9b1",
        position: "fixed",
        top: "0",
        zIndex:"1"
    }
}

export default Posts;
