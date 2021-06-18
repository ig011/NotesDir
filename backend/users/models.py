from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class ExtendUser(AbstractUser):
    email = models.EmailField(max_length=250, blank=False, verbose_name='email')
    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'