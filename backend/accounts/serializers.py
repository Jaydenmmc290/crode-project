from rest_framework import serializers
from .models import Opportunity, CustomUser

class OpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunity
        fields = ['id', 'title', 'description', 'date_posted', 'posted_by']
        read_only_fields = ['id', 'date_posted', 'posted_by']


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'first_name', 'last_name', 'bio', 'email')
        read_only_fields = ('id', 'username', 'email') 
