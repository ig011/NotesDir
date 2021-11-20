from django.apps import apps
from django.contrib import admin

from .models import ExtendUser, UserInformation

# Register your models here.
admin.site.register(ExtendUser)
admin.site.register(UserInformation)

app = apps.get_app_config('graphql_auth')

for model_name, model in app.models.items():
    admin.site.register(model)