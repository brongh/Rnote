from django.contrib import admin
from django.urls import path, include
from users import views
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from users.views import MyObtainTokenPairView

router = routers.DefaultRouter()
router.register(r'notes', views.NotesViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'notesuser', views.NotesUserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api-auth/', include('rest_framework.urls')),
]
