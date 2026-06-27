from django.urls import path
from .views import (
    PostListCreateView, PostDetailView,
    CommentListCreateView, CommentDeleteView,
    LikeToggleView, UserPostsView
)

urlpatterns = [
    path('posts/', PostListCreateView.as_view(), name='post-list'),
    path('posts/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    path('posts/<int:pk>/comments/', CommentListCreateView.as_view(), name='comment-list'),
    path('comments/<int:pk>/', CommentDeleteView.as_view(), name='comment-delete'),
    path('posts/<int:pk>/like/', LikeToggleView.as_view(), name='like-toggle'),
    path('users/<int:user_id>/posts/', UserPostsView.as_view(), name='user-posts'),
]