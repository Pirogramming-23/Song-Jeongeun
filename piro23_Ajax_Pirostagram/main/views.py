from django.shortcuts import render, redirect
from .models import Post
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Post, Comment, Image
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.template.loader import render_to_string




def post_list(request):
    posts = Post.objects.all().order_by('-created_at')
    return render(request, 'main/post_list.html', {'posts': posts})

from django.views.decorators.csrf import csrf_exempt

@require_POST
@login_required  
def toggle_like(request):
    data = json.loads(request.body)
    post_id = data.get('post_id')

    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return JsonResponse({'error': '게시글을 찾을 수 없습니다.'}, status=404)

    user = request.user

    if user in post.likes.all():
        post.likes.remove(user)
        liked = False
    else:
        post.likes.add(user)
        liked = True

    return JsonResponse({
        'like_count': post.likes.count(),
        'liked': liked
    })

@require_POST
@login_required
def add_comment(request):
    data = json.loads(request.body)
    post_id = data.get('post_id')
    content = data.get('content')

    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return JsonResponse({'error': '게시글이 존재하지 않습니다.'}, status=404)

    comment = Comment.objects.create(
        post=post,
        author=request.user,
        content=content
    )

    return JsonResponse({
        'author': comment.author.username,
        'content': comment.content
    })

@require_POST
@csrf_exempt
def delete_comment(request):
    data = json.loads(request.body)
    comment_id = data.get('comment_id')

    try:
        comment = Comment.objects.get(id=comment_id)
        comment.delete()
        return JsonResponse({'status': 'success'})
    except Comment.DoesNotExist:
        return JsonResponse({'status': 'fail'}, status=404)

@login_required
def create_post(request):
    if request.method == 'POST':
        image = request.FILES.get('image')
        caption = request.POST.get('caption')
        
    


        Post.objects.create(
            author=request.user,
            image=image,
            caption=caption
        )
        return redirect('main:post_list')
    return render(request, 'main/post_create.html')

def search_posts(request):
    q = request.GET.get('q', '')
    posts = Post.objects.filter(caption__icontains=q).order_by('-created_at')
    return render(request, 'main/partial_post_list.html', {'posts': posts})

def search_posts(request):
    query = request.GET.get('q', '')
    if query:
        posts = Post.objects.filter(caption__icontains=query)
    else:
        posts = Post.objects.all()

    html = render_to_string('main/partial_post_list.html', {'posts': posts}, request=request)
    return JsonResponse({'html': html})