"""
Session-scope fixture, ami elindítja a statikus build-et és kiszolgálja a
dist/-et — ez a Playwright TS oldal `webServer` auto-start funkciójának
(playwright.config.ts) a Python megfelelője. A pytest-playwright pluginnek
nincs beépített megfelelője erre, ezért subprocess-szel oldjuk meg.
"""

import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

import pytest

PROJECT_ROOT = Path(__file__).resolve().parent.parent
PORT = 4173
BASE_URL = f"http://localhost:{PORT}"


def _wait_until_up(url: str, timeout: float = 30.0) -> None:
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        try:
            urllib.request.urlopen(url, timeout=1)
            return
        except (urllib.error.URLError, ConnectionError):
            time.sleep(0.5)
    raise RuntimeError(f"A dev szerver nem állt fel {timeout}s alatt ({url}).")


@pytest.fixture(scope="session", autouse=True)
def live_server():
    npm = "npm.cmd" if sys.platform == "win32" else "npm"
    subprocess.run([npm, "run", "build"], cwd=PROJECT_ROOT, check=True)

    server = subprocess.Popen(
        [npm, "exec", "--", "http-server", "dist", "-p", str(PORT), "-s"],
        cwd=PROJECT_ROOT,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    try:
        _wait_until_up(f"{BASE_URL}/index.html")
        yield
    finally:
        server.terminate()
        server.wait(timeout=10)


@pytest.fixture
def home_page(page):
    from pages.home_page import HomePage

    return HomePage(page)
