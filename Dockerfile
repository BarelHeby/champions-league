# Use a lightweight Python base image
FROM python:3.10-slim-buster

# Set the working directory
WORKDIR /app

# Copy requirements.txt and install dependencies
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port your Django app will listen on
EXPOSE 8000

# Command to run the Django app
CMD ["gunicorn", "--bind", ":8000", "main.wsgi:application"]
