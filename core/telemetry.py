import sentry_sdk
from functools import wraps
import time
from core.config import settings

def init_sentry():
    if settings.SENTRY_DSN:
        sentry_sdk.init(
            dsn=settings.SENTRY_DSN,
            traces_sample_rate=1.0,
            profiles_sample_rate=1.0,
            environment="production",
            release=f"{settings.APP_NAME}@{settings.VERSION}"
        )
        print("[Sentry] Tracing initialized successfully.")
    else:
        print("[Sentry] No DSN provided; tracing will run in local no-op mode.")

def trace_span(op: str, description: str = ""):
    """Decorator to trace functions as Sentry spans."""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if settings.SENTRY_DSN:
                with sentry_sdk.start_span(op=op, description=description or func.__name__):
                    return func(*args, **kwargs)
            else:
                return func(*args, **kwargs)
        return wrapper
    return decorator
