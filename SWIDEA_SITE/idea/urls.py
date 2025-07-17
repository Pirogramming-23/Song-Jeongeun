from django.urls import path
from . import views

app_name = 'idea'

urlpatterns = [
    path('list/', views.idea_list, name='idea_list'),
    path('create/', views.idea_create, name='idea_create'),
    path('<int:id>/', views.idea_detail, name='idea_detail'),
    path('<int:pk>/update/', views.idea_update, name='idea_update'),
    path('<int:id>/delete/', views.idea_delete, name='idea_delete'),
    path('<int:id>/adjust_interest/', views.adjust_interest, name='adjust_interest'),

]
