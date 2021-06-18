from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(max_length=200, blank=False, verbose_name='email')
    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'