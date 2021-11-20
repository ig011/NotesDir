from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models


#Functions
def upload_user_profile_picture(instance, filename):
    print(filename)
    return  ''.join([str(settings.MEDIA_ROOT), '/', instance.user.username, '/', filename])

# Create your models here.
class ExtendUser(AbstractUser):
    email = models.EmailField(max_length=250, blank=False, verbose_name='email')
    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'

class UserInformation(models.Model):
    user = models.ForeignKey(ExtendUser, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to=upload_user_profile_picture, null=True, blank=True)
