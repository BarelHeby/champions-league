# Use a lightweight Python base image
FROM python:3.10-slim-buster

# Set the working directory
WORKDIR /app

# Copy requirements.txt and install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port your Django app will listen on
EXPOSE 80

# Command to run the Django app in development
# CMD ["python", "manage.py", "runserver", "0.0.0.0:80"]
CMD ["gunicorn", "--bind", "0.0.0.0:80", "main.wsgi:application"]