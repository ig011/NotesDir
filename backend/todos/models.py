from django.db import models
from users.models import ExtendUser


# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=250, blank=False)
    description = models.TextField()
    modified_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    thumbnail = models.URLField(blank=True, null=True)
    background_color = models.CharField(max_length=250, blank=True, null=True, default='white')
    start_date = models.DateTimeField(blank=True, null=True, auto_now=True)
    end_date = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(ExtendUser, on_delete=models.CASCADE)
    is_done = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False)

    def __str__(self):
        return ''.join([self.user.username, ' | ', self.title, ' | expire at: ', str(self.end_date)])
    