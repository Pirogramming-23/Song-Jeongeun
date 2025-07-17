from django.shortcuts import render, get_object_or_404, redirect
from .models import DevTool
from .forms import DevToolForm

def devtool_detail(request, pk):
    devtool = get_object_or_404(DevTool, pk=pk)
    ideas = devtool.idea_set.all()  # 이 개발툴을 사용하는 아이디어 리스트
    return render(request, 'devtool/devtool_detail.html', {
        'devtool': devtool,
        'ideas': ideas
    })
def devtool_list(request):
    devtools = DevTool.objects.all()
    return render(request, 'devtool/devtool_list.html', {'devtools': devtools})


def devtool_create(request):
    form = DevToolForm(request.POST or None)
    if form.is_valid():
        devtool = form.save()
        return redirect('devtool:devtool_detail', pk=devtool.pk)
    else:
        form = DevToolForm()
    return render(request, 'devtool/devtool_form.html', {'form': form})

def devtool_delete(request, pk):
    devtool = get_object_or_404(DevTool, pk=pk)
    devtool.delete()
    return redirect('devtool:devtool_list')

def devtool_update(request, pk):
    devtool = get_object_or_404(DevTool, pk=pk)

    if request.method == 'POST':
        form = DevToolForm(request.POST, instance=devtool)
        if form.is_valid():
            form.save()
            return redirect('devtool:devtool_detail', pk=devtool.pk)
    else:
        form = DevToolForm(instance=devtool)

    return render(request, 'devtool/devtool_form.html', {
        'form': form,
        'devtool': devtool
    })