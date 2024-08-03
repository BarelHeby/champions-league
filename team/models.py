from django.db import models
import base64
from io import BytesIO
from PIL import Image
import numpy as np
import cv2
import rembg
from main.Image import compress_and_resize_base64_image
# Create your models here.
class Team(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    logo = models.TextField()

    def __str__(self):
        return self.name    
    
    def toJson(self):
        return {
            "id":self.id,
            "name":self.name,
            "logo": compress_and_resize_base64_image(self.logo,(100,100))
        }
    

    def removeBackround(b64image):
        image_metadata = b64image.split(",")
        image_data = base64.b64decode(image_metadata[1])
        image = Image.open(BytesIO(image_data))
        if image.mode != 'RGBA':
            image = image.convert("RGBA")
        image_np = np.array(image)
        result_np = rembg.remove(image_np)
        result_image = Image.fromarray(result_np)
        buffered = BytesIO()
        result_image.save(buffered, format="PNG")
        return image_metadata[0]+","+base64.b64encode(buffered.getvalue()).decode()
