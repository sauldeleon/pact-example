import os
from setuptools import find_packages, setup


def list_requirements():
    reqs_filename = "requirements.txt"
    reqs = None
    if os.path.isfile(reqs_filename):
        with open(reqs_filename) as f:
            reqs = f.readlines()

    return reqs


setup(
    name="pact-example",
    python_requires=">=3.9",
    classifiers=[
        "Intended Audience :: Developers",
        "Natural Language :: English",
        "Programming Language :: Python :: 3.9",
    ],
    description="Python package for pacts",
    install_requires=list_requirements(),
    include_package_data=True,
    packages=find_packages(include=["duration_provider", "movies_api"]),
    url="https://github.com/sauldeleon/pact-example.git",
    version="0.0.1",
    zip_safe=False,
)