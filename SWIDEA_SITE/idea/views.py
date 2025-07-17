from django.shortcuts import render, redirect
from .forms import IdeaForm
from .models import Idea
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

# Create your views here.
def idea_list(request):
    sort = request.GET.get('sort', 'interest')  # 기본 정렬은 관심도순
    if sort == 'interest':
        ideas = Idea.objects.all().order_by('-interest')
    elif sort == 'latest':
        ideas = Idea.objects.all().order_by('-id')  # 최신순
    elif sort == 'name':
        ideas = Idea.objects.all().order_by('title')  # 이름순
    else:
        ideas = Idea.objects.all()

    return render(request, 'idea/idea_list.html', {'ideas': ideas, 'sort': sort})


def idea_create(request):
    if request.method == 'POST':
        form = IdeaForm(request.POST, request.FILES)
        if form.is_valid():
            idea = form.save()
            return redirect('idea:idea_detail', id=idea.id)
    else:
        form = IdeaForm()
    return render(request, 'idea/idea_form.html', {'form': form})

def idea_detail(request, id):
    idea = get_object_or_404(Idea, id=id)
    return render(request, 'idea/idea_detail.html', {'idea': idea})

def idea_update(request, pk):
    idea = get_object_or_404(Idea, pk=pk)

    if request.method == 'POST':
        form = IdeaForm(request.POST, request.FILES, instance=idea)
        if form.is_valid():
            form.save()
            return redirect('idea:idea_detail', id=idea.id)
    else:
        form = IdeaForm(instance=idea)

    return render(request, 'idea/idea_form.html', {'form': form, 'idea': idea})

def idea_delete(request, pk):
    idea = get_object_or_404(Idea, pk=pk)
    if request.method == 'POST':
        idea.delete()
        return redirect('idea:idea_list')
    return render(request, 'idea/idea_confirm_delete.html', {'idea': idea})

@csrf_exempt
def adjust_interest(request, id):
    idea = get_object_or_404(Idea, id=id)
    if request.method == 'POST':
        data = json.loads(request.body)
        if data['action'] == 'plus':
            idea.interest += 1
        elif data['action'] == 'minus':
            idea.interest = max(0, idea.interest - 1)
        idea.save()
        return JsonResponse({'success': True, 'new_interest': idea.interest})
    return JsonResponse({'success': False})