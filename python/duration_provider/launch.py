import subprocess

VERSION = '1.0.0'
PORT = 9000


def main():
    p_app = subprocess.Popen(['python', './main.py'])

    try:
        p_verifier = subprocess.Popen(
            [
                'pactman-verifier',
                '-b', 'http://localhost/', 'duration-provider',
                f'http://localhost:{PORT}', f'http://localhost:{PORT}/_pact/provider_states', '-a',
                VERSION, '-r'
            ]
        )
        p_verifier.communicate()
    except Exception:
        p_app.kill()
    p_app.kill()


if __name__ == '__main__':
    main()