from django.db import models
from datetime import datetime

from django.db.models.base import Model
from users.models import ExtendUser

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=250, blank=False)
    description = models.TextField()
    modified_at = models.DateTimeField(default=datetime.now())
    created_at = models.DateTimeField(auto_now_add=True)
    thumbnail = models.URLField(blank=True, null=True)
    background_color = models.CharField(max_length=250, blank=True, null=True, default='white')
    start_date = models.DateTimeField(blank=True, null=True, default=datetime.now())
    end_date = models.DateTimeField(default=datetime.now())
    user = models.ForeignKey(ExtendUser, on_delete=models.CASCADE)

    def __str__(self):
        return ''.join([self.user.username, ' | ', self.title, ' | expire at: ', str(self.end_date)])
    