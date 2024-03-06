from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

PRIORITY_MAX = 10
PRIORITY_MIN = 1

class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField(blank=True, default="")
    completed = models.BooleanField(default=False)
    priority = models.IntegerField(
        default=10, 
        validators=[
            MinValueValidator(1), 
            MaxValueValidator(10)
        ]
    ) # Lower number is higher priority.
    due_date = models.DateTimeField(null=True)

    def _str_(self):
        return self.title

