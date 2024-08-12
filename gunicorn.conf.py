import multiprocessing

bind = "0.0.0.0:80"
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "sync"
timeout = 120
keepalive = 2
errorlog = "-"  # Log errors to stderr
accesslog = "-"  # Log access to stdout
