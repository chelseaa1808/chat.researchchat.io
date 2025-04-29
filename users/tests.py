from django.test import TestCase
from django.contrib.auth import get_user_model
from users.models import Profile

User = get_user_model()

class UserModelTests(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='bigdata.grp10@gmail.com',
            password='securepassword123',
            name='Test User',
            bio='Bio test',
            institution='Research Lab'
        )

    def test_user_creation(self):
        self.assertEqual(self.user.username, 'testuser')
        self.assertEqual(self.user.email, 'bigdata.grp10@gmail.com')
        self.assertTrue(self.user.check_password('securepassword123'))

    def test_profile_created_on_user_creation(self):
        profile = Profile.objects.get(user=self.user)
        self.assertIsNotNone(profile)
        self.assertEqual(profile.user, self.user)

    def test_profile_defaults(self):
        profile = Profile.objects.get(user=self.user)
        self.assertEqual(profile.institution, '')
        self.assertEqual(profile.bio, None)

    def test_user_str_method(self):
        self.assertEqual(str(self.user), 'testuser')

    def test_profile_str_method(self):
        profile = Profile.objects.get(user=self.user)
        self.assertEqual(str(profile), f"Profile for {self.user.username}")

# To run tests use bash scripting
# python manage.py test users 
