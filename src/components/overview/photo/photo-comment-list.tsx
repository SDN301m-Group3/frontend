import PhotoComment from './photo-comment';

const comments = [
    {
        id: '1',
        content: 'Comment 1',
        user: {
            id: '1',
            fullName: 'User 1',
            username: 'user1',
            email: '',
        },
        createdAt: '2024-06-15T13:17:10.139+00:00',
    },
];

export default function PhotoCommentList() {
    return (
        <div>
            {comments.map((comment) => (
                <PhotoComment key={comment.id} comment={comment} />
            ))}
        </div>
    );
}
