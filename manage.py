
from dotenv import load_dotenv
import os
load_dotenv()
import sys
from pathlib import Path


if __name__ == "__main__":
    # Load .env environment variables (useful for secrets and DB configs)
    BASE_DIR = Path(__file__).resolve().parent
    dotenv_path = BASE_DIR / "researchchat.env"
    if dotenv_path.exists():
        load_dotenv(dotenv_path)

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "chattr_gpt.settings")

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    execute_from_command_line(sys.argv)
