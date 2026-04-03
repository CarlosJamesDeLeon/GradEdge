import React, { useState } from 'react';
import { Send, Shield, ShieldOff, Reply } from 'lucide-react';
import Avatar from './Avatar';
import { cn } from '@/lib/utils';

export interface CommentType {
  id: string;
  postId: number;
  parentId: string | null;
  author: string;
  content: string;
  isAnonymous: boolean;
  createdAt: string;
  replies?: CommentType[];
}

const MOCK_COMMENTS: Record<number, CommentType[]> = {
  1: [
    {
      id: 'c1',
      postId: 1,
      parentId: null,
      author: 'David Wright',
      content: 'AVL trees strictly enforce a 1-level difference, which guarantees faster lookups but slower insertions compared to Red-Black trees.',
      isAnonymous: false,
      createdAt: '1 hour ago',
      replies: [
        {
          id: 'c2',
          postId: 1,
          parentId: 'c1',
          author: 'Anonymous Student',
          content: 'That makes sense! Is there a specific use case where you would absolutely prefer RB over AVL?',
          isAnonymous: true,
          createdAt: '45 mins ago',
          replies: []
        }
      ]
    }
  ],
  2: [
    {
      id: 'c3',
      postId: 2,
      parentId: null,
      author: 'Emma Watson',
      content: 'Engagement rate relative to impressions is usually the gold standard right now.',
      isAnonymous: false,
      createdAt: '3 hours ago',
      replies: []
    }
  ]
};

const CommentItem: React.FC<{ comment: CommentType, onReply: (parentId: string, content: string, isAnon: boolean) => void }> = ({ comment, onReply }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [replyAnon, setReplyAnon] = useState(false);

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      onReply(comment.id, replyContent, replyAnon);
      setReplyContent('');
      setIsReplying(false);
    }
  };

  return (
    <div className="flex flex-col mb-4">
      {/* Comment Card */}
      <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white border border-transparent shadow-sm transition-all duration-300 hover:shadow-md hover:border-l-2 hover:border-l-[#FFD700] hover:border-y-gray-100 hover:border-r-gray-100 border-gray-100 group">
        <Avatar 
          name={comment.isAnonymous ? "Anonymous User" : comment.author} 
          isAnonymous={comment.isAnonymous} 
          size="sm"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className={cn(
              "font-bold text-sm",
              comment.isAnonymous ? "text-[#002147]/70 italic" : "text-[#002147]"
            )}>
              {comment.author}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">• {comment.createdAt}</span>
          </div>
          <p className="text-[#002147] text-sm font-medium leading-relaxed mb-3">
            {comment.content}
          </p>
          <button 
            onClick={() => setIsReplying(!isReplying)}
            className="flex items-center space-x-1 text-xs font-black uppercase tracking-widest text-[#002147]/40 hover:text-[#FFD700] transition-colors"
          >
            <Reply className="h-3 w-3" />
            <span>Reply</span>
          </button>

          {/* Inline Reply Input */}
          {isReplying && (
            <div className="mt-4 pt-4 border-t border-gray-50 flex flex-col space-y-3 animate-in slide-in-from-top-2">
              <input
                type="text"
                autoFocus
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="w-full bg-slate-50 border-2 border-[#002147]/10 rounded-xl px-4 py-2 text-sm font-medium text-[#002147] focus:outline-none focus:border-[#002147] focus:ring-2 focus:ring-[#FFD700]/30 transition-all"
              />
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setReplyAnon(!replyAnon)}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border-2",
                    replyAnon 
                      ? "bg-[#FFD700]/10 border-[#FFD700] text-[#002147]" 
                      : "bg-white border-gray-200 text-[#002147]/40 hover:border-[#FFD700]/30 hover:text-[#FFD700]"
                  )}
                >
                  {replyAnon ? <ShieldOff className="h-3 w-3" /> : <Shield className="h-3 w-3" />}
                  <span>{replyAnon ? "Public" : "Anonymous"}</span>
                </button>
                <button
                  onClick={handleReplySubmit}
                  disabled={!replyContent.trim()}
                  className="bg-[#002147] text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider disabled:opacity-50 transition-colors hover:bg-black"
                >
                  Send Reply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-8 mt-4 pl-4 border-l border-[#002147]/20 flex flex-col space-y-4">
          {comment.replies.map(reply => (
            <CommentItem key={reply.id} comment={reply} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
};

export const CommentInput: React.FC<{ onPost: (content: string, isAnon: boolean) => void }> = ({ onPost }) => {
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = () => {
    if (content.trim()) {
      onPost(content, isAnonymous);
      setContent('');
      setIsAnonymous(false);
    }
  };

  return (
    <div className="flex flex-col space-y-3 bg-white p-4 rounded-2xl border-2 border-[#002147] shadow-sm focus-within:ring-4 focus-within:ring-[#FFD700]/10 transition-all duration-300">
      <div className="flex items-start space-x-3">
        <Avatar name="Janet Doe" isAnonymous={isAnonymous} size="sm" />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add to the discussion..."
          className="w-full bg-transparent border-none focus:ring-0 text-[#002147] font-medium text-sm resize-none h-10 min-h-[40px] pt-1"
        />
      </div>
      <div className="flex items-center justify-between border-t border-gray-50 pt-3">
        <button
          onClick={() => setIsAnonymous(!isAnonymous)}
          className={cn(
            "flex items-center space-x-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border-2",
            isAnonymous 
              ? "bg-[#FFD700]/10 border-[#FFD700] text-[#002147] shadow-sm" 
              : "bg-white border-gray-200 text-[#002147]/40 hover:border-[#FFD700]/30 hover:text-[#FFD700]"
          )}
        >
          {isAnonymous ? <ShieldOff className="h-3 w-3" /> : <Shield className="h-3 w-3" />}
          <span>{isAnonymous ? "Go Public" : "Post Anonymously"}</span>
        </button>
        <button
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="flex items-center space-x-2 bg-[#FFD700] text-[#002147] hover:bg-[#FFC000] px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:-translate-y-0.5 shadow-lg shadow-[#FFD700]/20 disabled:opacity-50 disabled:grayscale active:scale-95"
        >
          <span>Send</span>
          <Send className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

interface ThreadedCommentsProps {
  postId: number;
  onCommentAdded?: () => void;
}

const ThreadedComments: React.FC<ThreadedCommentsProps> = ({ postId, onCommentAdded }) => {
  const [comments, setComments] = useState<CommentType[]>(MOCK_COMMENTS[postId] || []);

  const handleNewComment = (content: string, isAnonymous: boolean) => {
    const newComment: CommentType = {
      id: `new-${Date.now()}`,
      postId,
      parentId: null,
      author: isAnonymous ? 'Anonymous Student' : 'Janet Doe',
      content,
      isAnonymous,
      createdAt: 'Just now',
      replies: []
    };
    setComments([...comments, newComment]);
    onCommentAdded?.();
  };

  const traverseAndAddReply = (nodes: CommentType[], parentId: string, reply: CommentType): CommentType[] => {
    return nodes.map(node => {
      if (node.id === parentId) {
        return { ...node, replies: [...(node.replies || []), reply] };
      }
      if (node.replies) {
        return { ...node, replies: traverseAndAddReply(node.replies, parentId, reply) };
      }
      return node;
    });
  };

  const handleReply = (parentId: string, content: string, isAnonymous: boolean) => {
    const reply: CommentType = {
      id: `new-reply-${Date.now()}`,
      postId,
      parentId,
      author: isAnonymous ? 'Anonymous Student' : 'Janet Doe',
      content,
      isAnonymous,
      createdAt: 'Just now',
      replies: []
    };
    setComments(traverseAndAddReply(comments, parentId, reply));
    onCommentAdded?.();
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col space-y-6 animate-in slide-in-from-top-4 fade-in duration-500">
      <div className="flex flex-col space-y-4">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} onReply={handleReply} />
        ))}
      </div>

      <CommentInput onPost={handleNewComment} />
    </div>
  );
};

export default ThreadedComments;
