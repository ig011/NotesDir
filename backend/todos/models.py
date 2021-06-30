from django.db import models
from users.models import ExtendUser
from django.utils.timezone import now

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=250, blank=False)
    description = models.TextField()
    modified_at = models.DateTimeField(default=now())
    created_at = models.DateTimeField(auto_now_add=True)
    thumbnail = models.URLField(blank=True, null=True)
    background_color = models.CharField(max_length=250, blank=True, null=True, default='white')
    start_date = models.DateTimeField(blank=True, null=True, default=now())
    end_date = models.DateTimeField(default=now())
    user = models.ForeignKey(ExtendUser, on_delete=models.CASCADE)
    slug = models.SlugField(max_length=250, unique=True)
    is_done = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False)

    def __str__(self):
        return ''.join([self.user.username, ' | ', self.title, ' | expire at: ', str(self.end_date)])
    