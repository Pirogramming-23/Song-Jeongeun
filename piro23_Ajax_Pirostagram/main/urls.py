from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path('', views.post_list, name='post_list'),
    path('toggle_like/', views.toggle_like, name='toggle_like'),
    path('add_comment/', views.add_comment, name='add_comment'),
    path('delete_comment/', views.delete_comment, name='delete_comment'),
    path('create/', views.create_post, name='create_post'),
    path('search/', views.search_posts, name='search_posts'), 

]
