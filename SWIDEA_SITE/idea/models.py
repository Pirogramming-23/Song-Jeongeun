from django.db import models
from devtool.models import DevTool

# Create your models here.

class Idea(models.Model):
    title =models.CharField(max_length=100, null=False, blank=False, default="")
    image = models.ImageField(upload_to='idea_images/', blank=True, null=True)
    content = models.TextField()
    interest = models.IntegerField(default=0)
    devtool = models.ForeignKey(DevTool, on_delete=models.CASCADE)
    
    def __str__(self):
        return str(self.title)
class IdeaStar(models.Model):
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE, related_name='ideastar')
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('idea', 'user')  # 중복 찜 방지

    def __str__(self):
        return f"{self.user.username} → {self.idea.title}"



