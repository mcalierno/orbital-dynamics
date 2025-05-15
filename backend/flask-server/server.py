from flask import Flask
import sys
sys.path.insert(1, '/Users/Michael/Code/Projects/OrbitalDynamics/backend/models')
import run_spacecraft

app = Flask(__name__)

@app.route('/run', methods=['GET'])
def test():
    x = run_spacecraft.run_server('b-', 32, 100, 266, 'F_r=32, t_thrust=266')
    return x


if __name__ == '__main__':
    app.run(port=6950, debug=True)