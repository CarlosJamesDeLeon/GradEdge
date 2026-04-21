import React, { useState } from 'react';
import { Send, Shield, ShieldOff, Reply, ArrowUp } from 'lucide-react';
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
  upvotes?: number;
  hasUpvoted?: boolean;
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
      upvotes: 12,
      hasUpvoted: false,
      replies: [
        {
          id: 'c2',
          postId: 1,
          parentId: 'c1',
          author: 'Anonymous Student',
          content: 'That makes sense! Is there a specific use case where you would absolutely prefer RB over AVL?',
          isAnonymous: true,
          createdAt: '45 mins ago',
          upvotes: 8,
          hasUpvoted: true,
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
      upvotes: 3,
      hasUpvoted: false,
      replies: []
    }
  ]
};

const CommentItem: React.FC<{ comment: CommentType, onReply: (parentId: string, content: string, isAnon: boolean) => void, onUpvote: (id: string) => void }> = ({ comment, onReply, onUpvote }) => {
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
      <div className="flex items-start space-x-4 p-4 rounded-2xl bg-[#000c1a] border border-[#C5A059]/15 shadow-sm transition-all duration-300 hover:shadow-md hover:border-l-2 hover:border-l-[#C5A059] hover:border-y-[#C5A059]/20 hover:border-r-[#C5A059]/20 group">
        <Avatar 
          name={comment.isAnonymous ? "Anonymous User" : comment.author} 
          isAnonymous={comment.isAnonymous} 
          size="sm"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className={cn(
              "font-playfair font-black text-base tracking-wide",
              comment.isAnonymous ? "text-[#F0EDE6]/70 italic" : "text-[#F0EDE6]"
            )}>
              {comment.author}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#F0EDE6]/40">• {comment.createdAt}</span>
          </div>
          <p className="text-[#F0EDE6]/80 text-sm font-medium leading-relaxed mb-3">
            {comment.content}
          </p>
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => onUpvote(comment.id)}
              className={cn(
                "flex items-center space-x-1.5 text-xs font-black uppercase tracking-widest transition-colors",
                comment.hasUpvoted ? "text-[#C5A059]" : "text-[#F0EDE6]/40 hover:text-[#C5A059]"
              )}
            >
              <ArrowUp className={cn("h-4 w-4", comment.hasUpvoted && "stroke-[3px]")} />
              <span>{comment.upvotes || 0}</span>
            </button>
            <button 
              onClick={() => setIsReplying(!isReplying)}
              className="flex items-center space-x-1.5 text-xs font-black uppercase tracking-widest text-[#F0EDE6]/40 hover:text-[#C5A059] transition-colors"
            >
              <Reply className="h-4 w-4" />
              <span>Reply</span>
            </button>
          </div>

          {/* Inline Reply Input */}
          {isReplying && (
            <div className="mt-4 pt-4 border-t border-[#C5A059]/10 flex flex-col space-y-3 animate-in slide-in-from-top-2">
              <input
                type="text"
                autoFocus
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="w-full bg-[#001225] border-2 border-[#C5A059]/20 rounded-xl px-4 py-2 text-sm font-medium text-[#F0EDE6] focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/30 transition-all placeholder:text-[#F0EDE6]/30"
              />
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setReplyAnon(!replyAnon)}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border-2",
                    replyAnon 
                      ? "bg-[#C5A059]/10 border-[#C5A059] text-[#C5A059]" 
                      : "bg-[#001225] border-[#C5A059]/20 text-[#F0EDE6]/40 hover:border-[#C5A059]/30 hover:text-[#C5A059]"
                  )}
                >
                  {replyAnon ? <ShieldOff className="h-3 w-3" /> : <Shield className="h-3 w-3" />}
                  <span>{replyAnon ? "Public" : "Anonymous"}</span>
                </button>
                <button
                  onClick={handleReplySubmit}
                  disabled={!replyContent.trim()}
                  className="bg-[#C5A059] text-[#000c1a] px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider disabled:opacity-50 transition-colors hover:bg-[#D4AF37]"
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
        <div className="ml-8 mt-4 pl-4 border-l border-[#C5A059]/20 flex flex-col space-y-4">
          {comment.replies.map(reply => (
            <CommentItem key={reply.id} comment={reply} onReply={onReply} onUpvote={onUpvote} />
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
    <div className="flex flex-col space-y-3 bg-[#000c1a] p-4 rounded-2xl border border-[#C5A059]/20 shadow-sm focus-within:ring-4 focus-within:ring-[#C5A059]/10 transition-all duration-300">
      <div className="flex items-start space-x-3">
        <Avatar name="Janet Doe" isAnonymous={isAnonymous} size="sm" />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add to the discussion..."
          className="w-full bg-transparent border-none focus:ring-0 text-[#F0EDE6] placeholder:text-[#F0EDE6]/30 font-medium text-sm resize-none h-10 min-h-[40px] pt-1"
        />
      </div>
      <div className="flex items-center justify-between border-t border-[#C5A059]/10 pt-3">
        <button
          onClick={() => setIsAnonymous(!isAnonymous)}
          className={cn(
            "flex items-center space-x-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border-2",
            isAnonymous 
              ? "bg-[#C5A059]/10 border-[#C5A059] text-[#C5A059] shadow-sm" 
              : "bg-[#001225] border-[#C5A059]/20 text-[#F0EDE6]/40 hover:border-[#C5A059]/30 hover:text-[#C5A059]"
          )}
        >
          {isAnonymous ? <ShieldOff className="h-3 w-3" /> : <Shield className="h-3 w-3" />}
          <span>{isAnonymous ? "Go Public" : "Post Anonymously"}</span>
        </button>
        <button
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="flex items-center space-x-2 bg-[#C5A059] text-[#000c1a] hover:bg-[#D4AF37] px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:-translate-y-0.5 shadow-lg shadow-[#C5A059]/20 disabled:opacity-50 disabled:grayscale active:scale-95"
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
      upvotes: 0,
      hasUpvoted: false,
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

  const traverseAndUpvote = (nodes: CommentType[], commentId: string): CommentType[] => {
    return nodes.map(node => {
      if (node.id === commentId) {
        const currentlyUpvoted = node.hasUpvoted || false;
        const currentUpvotes = node.upvotes || 0;
        return { 
          ...node, 
          upvotes: currentlyUpvoted ? currentUpvotes - 1 : currentUpvotes + 1, 
          hasUpvoted: !currentlyUpvoted 
        };
      }
      if (node.replies) {
        return { ...node, replies: traverseAndUpvote(node.replies, commentId) };
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
      upvotes: 0,
      hasUpvoted: false,
      replies: []
    };
    setComments(traverseAndAddReply(comments, parentId, reply));
    onCommentAdded?.();
  };

  return (
    <div className="mt-6 pt-6 border-t border-[#C5A059]/10 flex flex-col space-y-6 animate-in slide-in-from-top-4 fade-in duration-500">
      <div className="flex flex-col space-y-4">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} onReply={handleReply} onUpvote={(id) => setComments(traverseAndUpvote(comments, id))} />
        ))}
      </div>

      <CommentInput onPost={handleNewComment} />
    </div>
  );
};

export default ThreadedComments;
