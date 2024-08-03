from PIL import Image
import base64
import io
def compress_and_resize_base64_image(base64_str, size=(50, 50), quality=85):
    # Decode the base64 string to get the image data
    image_data = base64.b64decode(base64_str.split(',')[1])

    # Open the image
    image = Image.open(io.BytesIO(image_data))
    # Resize the image
    image = image.resize(size, Image.LANCZOS)
    
    # Save the image to a bytes buffer
    buffer = io.BytesIO()
    image.save(buffer, format="PNG", quality=quality)
    # Encode the image to base64
    compressed_base64_str = base64.b64encode(buffer.getvalue()).decode('utf-8')
    return f"data:image/png;base64,{compressed_base64_str}"