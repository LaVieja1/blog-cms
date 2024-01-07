const CommentsJsx = (props) => {
    const { commentData, deleteComments } = props;

    if (commentData.length == 0) {
        return (
            <div>No hay comentarios</div>
        )
    }

    return (
        <div className="commentCont">
            {commentData.map((index) => {
                let date = new Date(index.timestamp).toLocaleString();

                return (
                    <div key={index._id} className="commentCard">
                        <div id={index._id} className="card">
                            <h3>{index.name}</h3>
                            <p>{index.text}</p>
                            <p>{date}</p>
                        </div>
                        <div className="deleteCommentContainer">
                            <button className="delete" value={index._id} onClick={deleteComments}>Borrar comentario</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default CommentsJsx;