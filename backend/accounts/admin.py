from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

admin.site.register(CustomUser, UserAdmin)

#Register It in Admin
from .models import Opportunity
admin.site.register(Opportunity)